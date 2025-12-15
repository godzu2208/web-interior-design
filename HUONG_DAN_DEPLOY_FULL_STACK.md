# Hướng Dẫn Deploy Backend lên Google Cloud Run & Kết Nối với Vercel

## 📋 Tổng Quan Roadmap

```
✅ Kết nối Supabase - XONG
✅ Build menu tree structure - XONG  
✅ Test API local (192.168.100.199:3001) - XONG
⏳ Tạo be/Dockerfile cho backend
⏳ Deploy backend lên Google Cloud Run
⏳ Copy URL backend từ Cloud Run
⏳ Update .env.production frontend với backend URL mới
⏳ Redeploy frontend trên Vercel
⏳ Test toàn bộ app trên production (HTTPS)
⏳ Cập nhật CORS trong backend nếu cần
```

---

## Phần 1: Chuẩn Bị Backend

### BƯỚC 1: Kiểm Tra Cấu Trúc Backend

Đảm bảo backend của bạn có cấu trúc tương tự:

```
backend/
├── src/
│   ├── index.js (hoặc server.js)
│   ├── routes/
│   ├── config/
│   │   └── database.js
│   └── ...
├── package.json
├── .env (local only)
└── .gitignore
```

### BƯỚC 2: Cập Nhật package.json

Mở `backend/package.json`, đảm bảo có:

```json
{
  "name": "backend",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "@supabase/supabase-js": "^2.39.0",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1"
  }
}
```

**Quan trọng:**
- `"type": "module"` nếu dùng ES6 imports
- Script `"start"` để Cloud Run chạy
- Có `cors` package

### BƯỚC 3: Cấu Hình CORS Trong Backend

Mở file `src/index.js` (hoặc `server.js`):

```javascript
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// CORS Configuration - QUAN TRỌNG!
const allowedOrigins = [
  'http://localhost:5173',           // Vite local
  'http://localhost:3000',           // React local
  process.env.FRONTEND_URL,          // Production URL từ env
  'https://your-app.vercel.app'      // ⚠️ Thay bằng URL Vercel của bạn
]

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true)
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(express.json())

// Health check endpoint - cho Cloud Run
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() })
})

// API routes
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' })
})

// Import your routes
// import menuRoutes from './routes/menu.js'
// app.use('/api/menu', menuRoutes)

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://0.0.0.0:${PORT}`)
})

export default app
```

**Lưu ý quan trọng:**
- Thay `'https://your-app.vercel.app'` bằng URL Vercel thực tế
- Listen trên `0.0.0.0` thay vì `localhost` để Cloud Run hoạt động
- Port từ `process.env.PORT` (Cloud Run tự set)

### BƯỚC 4: Tạo File .env.example

Tạo file `backend/.env.example`:

```env
# Server
PORT=3001

# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Frontend URL (for CORS)
FRONTEND_URL=https://your-app.vercel.app

# Node Environment
NODE_ENV=production
```

### BƯỚC 5: Cập Nhật .gitignore

Đảm bảo `backend/.gitignore` có:

```
# Environment
.env
.env.local
.env.production

# Dependencies
node_modules/

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# OS
.DS_Store
Thumbs.db
```

---

## Phần 2: Tạo Dockerfile

### BƯỚC 6: Tạo Dockerfile

Tạo file `backend/Dockerfile`:

```dockerfile
# Sử dụng Node.js LTS version
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Expose port (Cloud Run sẽ inject PORT env variable)
EXPOSE 8080

# Set environment to production
ENV NODE_ENV=production

# Start the application
CMD ["npm", "start"]
```

**Giải thích:**
- `node:20-alpine`: Image nhỏ gọn, nhanh
- `npm ci`: Install dependencies nhanh và deterministic
- `--only=production`: Không cài devDependencies
- `EXPOSE 8080`: Cloud Run mặc định dùng port 8080

### BƯỚC 7: Tạo .dockerignore

Tạo file `backend/.dockerignore`:

```
node_modules
npm-debug.log
.env
.env.local
.git
.gitignore
README.md
.DS_Store
```

### BƯỚC 8: Test Docker Local (Optional)

```bash
# Build Docker image
docker build -t backend-test .

# Run container
docker run -p 3001:8080 -e PORT=8080 backend-test

# Test
curl http://localhost:3001/health
```

---

## Phần 3: Setup Google Cloud

### BƯỚC 9: Cài Google Cloud CLI

#### Windows:
1. Download: https://cloud.google.com/sdk/docs/install
2. Chạy installer
3. Restart terminal

#### Mac:
```bash
brew install --cask google-cloud-sdk
```

#### Linux:
```bash
curl https://sdk.cloud.google.com | bash
exec -l $SHELL
```

### BƯỚC 10: Khởi Tạo Google Cloud

Mở terminal và chạy:

```bash
# Login vào Google Cloud
gcloud auth login

# Tạo project mới (hoặc dùng existing)
gcloud projects create your-project-id --name="Your Project Name"

# Set project mặc định
gcloud config set project your-project-id

# Enable các API cần thiết
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com
gcloud services enable cloudbuild.googleapis.com
```

**Lưu ý:**
- `your-project-id` phải là unique globally
- Dùng chữ thường, số, gạch ngang
- VD: `my-app-backend-2024`

### BƯỚC 11: Kiểm Tra Free Tier

Google Cloud Run Free Tier includes:
- ✅ 2 million requests/month
- ✅ 360,000 GB-seconds memory/month
- ✅ 180,000 vCPU-seconds/month
- ✅ 1 GB egress/month (Mỹ, Châu Âu, Châu Á)

**Đủ cho app nhỏ/vừa!**

---

## Phần 4: Deploy lên Cloud Run

### BƯỚC 12: Deploy Backend

Trong thư mục `backend/`, chạy:

```bash
# Build và deploy một lệnh
gcloud run deploy backend \
  --source . \
  --platform managed \
  --region asia-southeast1 \
  --allow-unauthenticated \
  --port 8080 \
  --memory 512Mi \
  --cpu 1 \
  --min-instances 0 \
  --max-instances 10 \
  --timeout 300
```

**Giải thích các options:**

| Option | Ý nghĩa |
|--------|---------|
| `--source .` | Build từ source code hiện tại |
| `--platform managed` | Fully managed Cloud Run |
| `--region asia-southeast1` | Singapore (gần VN nhất) |
| `--allow-unauthenticated` | Cho phép public access |
| `--port 8080` | Port container listen |
| `--memory 512Mi` | RAM allocation (free tier: tối đa 1GB) |
| `--cpu 1` | 1 vCPU |
| `--min-instances 0` | Scale to zero = miễn phí khi không dùng |
| `--max-instances 10` | Tối đa 10 instances |
| `--timeout 300` | Request timeout 5 phút |

### BƯỚC 13: Đợi Deploy Xong

Bạn sẽ thấy:

```
Building using Buildpacks...
✓ Creating Container Repository...
✓ Uploading sources...
✓ Building image...
✓ Pushing image...
Deploying container to Cloud Run service [backend]...
✓ Deploying... Done.
  ✓ Creating Revision...
  ✓ Routing traffic...
Done.
Service [backend] revision [backend-00001-abc] has been deployed.
Service URL: https://backend-xxxxxxxxxxxx-as.a.run.app
```

### BƯỚC 14: Copy Service URL

Copy URL từ output, ví dụ:
```
https://backend-xxxxxxxxxxxx-as.a.run.app
```

**⚠️ LƯU URL NÀY LẠI - Sẽ dùng cho frontend!**

### BƯỚC 15: Test Backend trên Cloud Run

```bash
# Test health endpoint
curl https://backend-xxxxxxxxxxxx-as.a.run.app/health

# Test API endpoint
curl https://backend-xxxxxxxxxxxx-as.a.run.app/api/test
```

Kết quả mong đợi:
```json
{"status":"ok","timestamp":"2024-12-15T10:30:00.000Z"}
{"message":"Backend is working!"}
```

### BƯỚC 16: Set Environment Variables trên Cloud Run

```bash
gcloud run services update backend \
  --region asia-southeast1 \
  --set-env-vars "VITE_SUPABASE_URL=https://mdvvlbobptudtackasqd.supabase.co,VITE_SUPABASE_ANON_KEY=your-anon-key,FRONTEND_URL=https://your-app.vercel.app,NODE_ENV=production"
```

**Hoặc qua Console UI:**
1. Vào https://console.cloud.google.com/run
2. Click vào service `backend`
3. Click **EDIT & DEPLOY NEW REVISION**
4. Scroll xuống **Variables & Secrets**
5. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `FRONTEND_URL`
   - `NODE_ENV=production`
6. Click **DEPLOY**

---

## Phần 5: Cấu Hình Frontend

### BƯỚC 17: Tạo File .env.production

Trong thư mục `frontend/`, tạo file `.env.production`:

```env
# Backend API URL từ Cloud Run
VITE_API_URL=https://backend-xxxxxxxxxxxx-as.a.run.app

# Supabase (nếu frontend cũng dùng)
VITE_SUPABASE_URL=https://mdvvlbobptudtackasqd.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

**⚠️ Thay URL bằng URL Cloud Run thực tế!**

### BƯỚC 18: Cập Nhật API Client trong Frontend

Tạo/update file `frontend/src/config/api.js`:

```javascript
// Get API base URL from environment
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export const apiClient = {
  async get(endpoint) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`)
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    return response.json()
  },
  
  async post(endpoint, data) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    return response.json()
  },
  
  async put(endpoint, data) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    return response.json()
  },
  
  async delete(endpoint) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE'
    })
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    return response.json()
  }
}

export default apiClient
```

### BƯỚC 19: Sử Dụng API Client

Trong components, dùng như sau:

```javascript
// src/components/MenuList.jsx
import { apiClient } from '../config/api'

async function fetchMenu() {
  try {
    const data = await apiClient.get('/api/menu')
    setMenu(data)
  } catch (error) {
    console.error('Error fetching menu:', error)
  }
}
```

---

## Phần 6: Deploy Frontend lên Vercel

### BƯỚC 20: Push Code lên GitHub (nếu chưa)

```bash
# Init git nếu chưa có
git init

# Add remote
git remote add origin https://github.com/your-username/your-repo.git

# Commit
git add .
git commit -m "Add production config and API client"

# Push
git push -u origin main
```

### BƯỚC 21: Connect Vercel với GitHub

1. Vào https://vercel.com
2. Click **Add New** → **Project**
3. Import repository từ GitHub
4. Select repository của bạn
5. Click **Import**

### BƯỚC 22: Configure Build Settings

Vercel tự động detect Vite project, nhưng kiểm tra lại:

- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

### BƯỚC 23: Add Environment Variables trên Vercel

1. Trong project settings
2. Vào **Settings** → **Environment Variables**
3. Add các biến sau cho **Production**:

```
VITE_API_URL=https://backend-xxxxxxxxxxxx-as.a.run.app
VITE_SUPABASE_URL=https://mdvvlbobptudtackasqd.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

**⚠️ Thay bằng values thực tế!**

### BƯỚC 24: Deploy

1. Click **Deploy**
2. Đợi build xong (2-5 phút)
3. Copy Production URL (VD: `https://your-app.vercel.app`)

---

## Phần 7: Update CORS và Test

### BƯỚC 25: Update CORS trong Backend

1. Mở `backend/src/index.js`
2. Update `allowedOrigins`:

```javascript
const allowedOrigins = [
  'http://localhost:5173',
  'https://your-app.vercel.app',  // ⚠️ Thay bằng URL Vercel thực tế
  'https://your-app-*.vercel.app' // Preview deployments
]
```

3. Commit và push:

```bash
git add .
git commit -m "Update CORS for Vercel"
git push
```

4. Redeploy backend:

```bash
cd backend
gcloud run deploy backend \
  --source . \
  --region asia-southeast1
```

### BƯỚC 26: Test Production App

#### Test 1: Health Check
```bash
curl https://backend-xxxxxxxxxxxx-as.a.run.app/health
```

#### Test 2: API từ Browser
1. Mở https://your-app.vercel.app
2. Mở DevTools (F12)
3. Check Console tab
4. Test các chức năng:
   - Fetch menu
   - Create item
   - Update item
   - Delete item

#### Test 3: Network Tab
1. F12 → Network tab
2. Thực hiện actions
3. Kiểm tra:
   - ✅ Status 200 OK
   - ✅ Response có data
   - ❌ Không có CORS errors

---

## Phần 8: Monitoring & Troubleshooting

### BƯỚC 27: View Logs trên Cloud Run

```bash
# View logs
gcloud run services logs read backend --region asia-southeast1

# Follow logs (real-time)
gcloud run services logs tail backend --region asia-southeast1
```

**Hoặc qua Console:**
1. Vào https://console.cloud.google.com/run
2. Click vào service `backend`
3. Tab **LOGS**

### BƯỚC 28: View Metrics

1. Trong Cloud Run console
2. Click vào service `backend`
3. Tab **METRICS**

Xem:
- Request count
- Request latency
- Container CPU/Memory usage
- Error rate

### BƯỚC 29: View Vercel Logs

1. Vào Vercel dashboard
2. Click vào project
3. **Deployments** → Click vào latest deployment
4. **View Function Logs** (nếu có)

---

## Xử Lý Lỗi Thường Gặp

### Lỗi 1: CORS Error

**Triệu chứng:**
```
Access to fetch at 'https://backend-xxx.run.app/api/menu' from origin 'https://your-app.vercel.app' has been blocked by CORS policy
```

**Giải pháp:**
1. Check `allowedOrigins` trong backend có URL Vercel chưa
2. Redeploy backend
3. Clear browser cache và test lại

### Lỗi 2: Cloud Run "Service Unavailable"

**Triệu chứng:**
```
503 Service Unavailable
```

**Giải pháp:**
1. Check logs: `gcloud run services logs read backend --region asia-southeast1`
2. Kiểm tra container có crash không
3. Kiểm tra PORT environment variable
4. Đảm bảo app listen trên `0.0.0.0:PORT`

### Lỗi 3: "Cannot find module"

**Triệu chứng:**
```
Error: Cannot find module './routes/menu.js'
```

**Giải pháp:**
1. Check import paths (case-sensitive)
2. Đảm bảo tất cả files đã commit
3. Rebuild: `gcloud run deploy backend --source .`

### Lỗi 4: Environment Variables không load

**Triệu chứng:**
```
undefined is not a valid URL
```

**Giải pháp:**
1. Check env vars trên Cloud Run console
2. Redeploy sau khi add env vars
3. Check code có dùng đúng `process.env.VARIABLE_NAME`

### Lỗi 5: Vercel Build Failed

**Triệu chứng:**
```
Error: Could not resolve './config/api'
```

**Giải pháp:**
1. Check import paths
2. Đảm bảo tất cả files đã commit và push
3. Kiểm tra `package.json` có đủ dependencies
4. Trigger redeploy trên Vercel

---

## Tối Ưu Chi Phí

### Free Tier Limits

**Google Cloud Run:**
- 2 triệu requests/tháng
- 360,000 GB-giây memory/tháng
- 180,000 vCPU-giây/tháng

**Vercel:**
- 100 GB bandwidth/tháng
- Unlimited requests

### Tips Tiết Kiệm

1. **Set min-instances = 0**: Scale to zero khi không dùng
2. **Optimize memory**: Chỉ dùng 512MB nếu đủ
3. **Cache responses**: Giảm số requests đến backend
4. **Use CDN**: Vercel tự động cache static assets
5. **Monitor usage**: Check Cloud Console thường xuyên

---

## Checklist Hoàn Thành

### Backend
- [ ] Cập nhật package.json với script `start`
- [ ] Configure CORS cho Vercel URL
- [ ] Tạo health check endpoint `/health`
- [ ] Listen trên `0.0.0.0:PORT`
- [ ] Tạo Dockerfile
- [ ] Tạo .dockerignore
- [ ] Test Docker local (optional)

### Google Cloud
- [ ] Cài Google Cloud CLI
- [ ] Login: `gcloud auth login`
- [ ] Tạo/chọn project
- [ ] Enable APIs cần thiết
- [ ] Deploy backend lên Cloud Run
- [ ] Copy Service URL
- [ ] Set environment variables
- [ ] Test backend URL

### Frontend
- [ ] Tạo `.env.production` với backend URL
- [ ] Tạo API client (`src/config/api.js`)
- [ ] Update components dùng API client
- [ ] Push code lên GitHub
- [ ] Connect Vercel với GitHub repo

### Vercel
- [ ] Import project
- [ ] Add environment variables
- [ ] Deploy
- [ ] Copy production URL

### Final Steps
- [ ] Update CORS với Vercel URL
- [ ] Redeploy backend
- [ ] Test health check
- [ ] Test API calls từ frontend
- [ ] Check browser console không có lỗi
- [ ] Test tất cả features
- [ ] Monitor logs và metrics

---

## Commands Tóm Tắt

```bash
# ===== GOOGLE CLOUD =====

# Login
gcloud auth login

# Set project
gcloud config set project your-project-id

# Enable APIs
gcloud services enable run.googleapis.com containerregistry.googleapis.com

# Deploy backend
cd backend
gcloud run deploy backend \
  --source . \
  --platform managed \
  --region asia-southeast1 \
  --allow-unauthenticated \
  --min-instances 0 \
  --memory 512Mi

# Set env vars
gcloud run services update backend \
  --region asia-southeast1 \
  --set-env-vars "KEY=value,KEY2=value2"

# View logs
gcloud run services logs tail backend --region asia-southeast1

# ===== FRONTEND =====

# Build local
npm run build

# Push to GitHub
git add .
git commit -m "Production ready"
git push

# (Deploy via Vercel dashboard)
```

---

## Cấu Trúc Project Sau Khi Hoàn Thành

```
your-project/
├── backend/
│   ├── src/
│   │   ├── index.js          (với CORS config)
│   │   ├── routes/
│   │   └── config/
│   ├── Dockerfile            ✅
│   ├── .dockerignore         ✅
│   ├── package.json          ✅
│   ├── .env.example
│   └── .gitignore
│
├── frontend/
│   ├── src/
│   │   ├── config/
│   │   │   └── api.js        ✅ (API client)
│   │   ├── components/
│   │   └── lib/
│   │       └── supabase.js
│   ├── .env.local            (local dev)
│   ├── .env.production       ✅ (production config)
│   ├── package.json
│   └── .gitignore
│
└── README.md
```

---

## Tài Nguyên Hữu Ích

- [Google Cloud Run Docs](https://cloud.google.com/run/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)

---

## Kết Luận

Sau khi hoàn thành các bước trên:

✅ Backend chạy trên Google Cloud Run (miễn phí, tự scale)
✅ Frontend deploy trên Vercel (miễn phí, CDN global)
✅ Database trên Supabase (miễn phí, managed PostgreSQL)
✅ CORS đã configure đúng
✅ HTTPS everywhere
✅ Production-ready!

**Tổng chi phí: $0/tháng** (trong giới hạn free tier)

---

**Chúc bạn deploy thành công! 🚀**

Có lỗi gì cứ hỏi nhé! 😊
