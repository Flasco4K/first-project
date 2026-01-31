async function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('token', data.token); // Bilet kilitlendi!
            window.location.href = 'todo.html';
        } else {
            alert(data.message);
        }
    } catch (err) { console.error("Login Hatasi:", err); }
}
async function register() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
        return alert("Lütfen tüm alanları doldur kanka!");
    }

    try {
        const response = await fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert("Kayıt başarılı! Şimdi giriş yapabilirsin.");
        } else {
            alert("Hata: " + data.message);
        }
    } catch (err) {
        console.error("Kayıt sırasında bağlantı hatası:", err);
    }
}

async function getTodos() {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch('http://localhost:3000/todos', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();

        if (Array.isArray(data)) {
            const list = document.getElementById('todoList');
            list.innerHTML = '';

            data.forEach(todo => {
                list.innerHTML += `
        <li>
            <span>${todo.title}</span>
            <button onclick="deleteTodo('${todo._id}')" class="delete-btn">Sil</button>
        </li>
    `;
            });
        }
    } catch (err) {
        console.error("Todolar çekilemedi:", err);
    }
}

async function addTodo() {
    const title = document.getElementById('todoTitle').value;
    const token = localStorage.getItem('token');
    try {
        const response = await fetch('http://localhost:3000/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ title })
        });
        if (response.ok) {
            document.getElementById('todoTitle').value = '';
            getTodos();
        }
    } catch (err) { console.error("Ekleme Hatasi:", err); }
}

async function deleteTodo(id) {
    const token = localStorage.getItem('token');
    if (!confirm("Bu görevi silmek istediğine emin misin?")) return;

    try {
        const response = await fetch(`http://localhost:3000/todos/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            console.log("Görev başarıyla silindi");
            getTodos(); // Listeyi hemen tazele kanka
        } else {
            const data = await response.json();
            alert("Silme hatası: " + data.message);
        }
    } catch (err) {
        console.error("Silme işlemi sırasında bağlantı hatası:", err);
    }
}

function logout() {
    localStorage.removeItem('token');
    window.location.href = 'index.html';
}