# 📌 GO EVENT

## 1️⃣ Latar Belakang dan Tujuan
Aplikasi Event Management dibuat untuk memudahkan pengguna dalam mengelola dan mendaftar acara (event). Aplikasi ini menyediakan fitur CRUD (Create, Read, Update, Delete) untuk event, serta fitur registrasi event oleh pengguna. 

### Tujuan dari aplikasi ini:
- Memudahkan pengguna untuk melihat dan mendaftar event yang ada di kampus.
- Menyediakan antarmuka yang user-friendly untuk pengguna.

---

## 2️⃣ Daftar API Endpoints

### 📌 **User API**
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| POST   | `/register` | Registrasi pengguna baru |
| POST   | `/login` | Login pengguna |

#### **Request Body Register**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```
#### **Response Register**
```json
{
  "message": "User registered successfully!"
}
```

#### **Request Body Login**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
#### **Response Login**
```json
{
  "message": "Login successfully!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 📌 **Event API**
| Method | Endpoint | Deskripsi |
|--------|----------------|---------------------------------|
| GET    | `/events/` | Mengambil daftar event |
| GET    | `/events/:id` | Mendapatkan detail event berdasarkan ID |
| POST   | `/events/` | Membuat event baru |
| PUT    | `/events/:id` | Mengupdate informasi event |
| DELETE | `/events/:id` | Menghapus event |

#### **Request Body Create Event**
```json
{
  "title": "Workshop",
  "description": "Learn new skills",
  "date": "2025-03-01",
  "location": "Online"
}
```
#### **Response Create Event**
```json
{
  "message": "Event created successfully!",
  "event": {
    "id": 2,
    "title": "Workshop",
    "description": "Learn new skills",
    "date": "2025-03-01",
    "location": "Online",
    "created_by": 1
  }
}
```

---

## 3️⃣ Struktur Database

### **Tabel: Users**
| Kolom | Tipe Data | Deskripsi |
|--------|----------|-------------|
| id | INT (Primary Key) | ID pengguna |
| name | VARCHAR | Nama pengguna |
| email | VARCHAR | Email pengguna (unik) |
| password | VARCHAR | Password pengguna |

### **Tabel: Events**
| Kolom | Tipe Data | Deskripsi |
|--------|----------|-------------|
| id | INT (Primary Key) | ID event |
| title | VARCHAR | Nama event |
| description | TEXT | Deskripsi event |
| date | VARCHAR | Tanggal event |
| location | VARCHAR | Lokasi event |
| created_by | INT | ID pembuat event |

---

## 4️⃣ Screenshot Aplikasi Frontend!

1. **Halaman Login**
   ![Screenshot (134)](https://github.com/user-attachments/assets/af1c33de-09b8-4e7a-b4c5-4d3a3e2e1167)
   
2. **Halaman Registrasi**
   ![Screenshot (137)](https://github.com/user-attachments/assets/ca2020ed-c480-430c-9e5d-48056357df31)

3. **Halaman Home**
   ![Screenshot (130)](https://github.com/user-attachments/assets/894cf485-56f8-475f-a9b7-baf566dc501d)
   
4. **Halaman Daftar Event**
   ![Screenshot (131)](https://github.com/user-attachments/assets/81d50ffa-3508-40cd-9ee1-10748f3366d7)
   
5. **Halaman Create Event**
   ![Screenshot (132)](https://github.com/user-attachments/assets/f988847b-1a74-4db1-b636-66ff86813c93)
   
6. **Halaman Edit Event**
   ![Screenshot (133)](https://github.com/user-attachments/assets/4447a5e8-fb39-4454-82b7-7f8f3818ec5d)
   
7. **Halaman Detail Event/Registrasi Event**
   ![Screenshot (138)](https://github.com/user-attachments/assets/28ef6155-787c-40bc-8fc6-3d123fb25ec4)

---

## 5️⃣ Flow Interaksi Frontend dengan Backend
1️⃣ **Login** → Frontend mengirimkan email dan password ke `/login`.
2️⃣ **Melihat Daftar Event** → Frontend mengirim permintaan ke `/events`.
3️⃣ **Mendaftar Event** → Frontend mengirim permintaan ke `/registrations/:event_id` dengan token JWT.
4️⃣ **Melihat Registrasi Pengguna** → Frontend mengirim permintaan ke `/registrations` dengan token JWT.
5️⃣ **Menghapus Event** → Frontend memanggil `/events/:id` dengan metode `DELETE` dan langsung menghapus dari UI tanpa refresh.

---

## 🔥 Cara Menjalankan Aplikasi

### Backend
1. Clone repository backend.
   ```bash
     https://github.com/alawii17/GoEvent_be.git
   ```
2. Install dependencies:
   ```bash
   go mod tidy
   ```
3. Jalankan server:
   ```bash
   go run main.go
   ```

### Frontend
1. Clone repository frontend
   ```bash
   https://github.com/alawii17/GoEvent_fe.git
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Jalankan aplikasi:
   ```bash
   npm start
   ```

Thank you. 🚀

