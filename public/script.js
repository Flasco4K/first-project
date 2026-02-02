// --- AUTH İŞLEMLERİ ---

async function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('token', data.token);
            window.location.href = 'todo.html';
        } else {
            alert(data.error || "Giriş başarısız!");
        }
    } catch (err) { alert("Sunucu hatası!"); }
}

async function handleRegister() {
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const confirm = document.getElementById('regPasswordConfirm').value;

    if (password !== confirm) return alert("Şifreler uyuşmuyor!");

    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        if (response.ok) {
            alert("Kayıt başarılı! Giriş yapabilirsin.");
            window.location.href = 'index.html';
        } else {
            const data = await response.json();
            alert(data.error || "Kayıt hatası!");
        }
    } catch (err) { alert("Bağlantı hatası!"); }
}

// --- ÇIKIŞ YAP (Hatanın Çözümü) ---
function logout() {
    localStorage.removeItem('token');
    window.location.href = 'index.html';
}

// --- TODO İŞLEMLERİ ---

async function getTodos() {
    const token = localStorage.getItem('token');
    if (!token) return window.location.href = 'index.html';

    try {
        const response = await fetch('/api/todos', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.status === 401) return logout(); // Token geçersizse şutla

        const data = await response.json();
        if (Array.isArray(data)) {
            const list = document.getElementById('todoList');
            list.innerHTML = data.map(todo => `
                <li>
                    <span class="${todo.completed ? 'completed' : ''}">${todo.title}</span>
                    <button onclick="deleteTodo('${todo._id}')">Sil</button>
                </li>
            `).join('');
        }
    } catch (err) { console.error("Todolar çekilemedi:", err); }
}

async function addTodo() {
    const input = document.getElementById('todoTitle');
    const title = input.value;
    const token = localStorage.getItem('token');

    if (!title.trim()) return alert("Bir şeyler yaz kanka!");

    try {
        const response = await fetch('/api/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ title })
        });

        if (response.ok) {
            input.value = '';
            getTodos();
        } else {
            const data = await response.json();
            alert("Ekleme hatası: " + (data.error || "Sunucu hatası"));
        }
    } catch (err) { console.error("Ekleme Hatası:", err); }
}

async function deleteTodo(id) {
    const token = localStorage.getItem('token');
    if (!confirm("Silmek istediğine emin misin?")) return;

    try {
        const response = await fetch(`/api/todos/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.ok) {
            getTodos();
        }
    } catch (err) { console.error("Silme hatası:", err); }
}

// Sayfa açıldığında todoları otomatik getir
if (window.location.pathname.includes('todo.html')) {
    getTodos();
}