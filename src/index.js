let editingIndex = null;

function getContacts() {
  return JSON.parse(localStorage.getItem("contacts") || "[]");
}

function saveContacts(contacts) {
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

function renderContacts() {
  const contacts = getContacts();
  const contactList = document.getElementById("contactList");
  contactList.innerHTML = "";

  contacts.forEach((contact, index) => {
    const contactDiv = document.createElement("div");
    contactDiv.className = "contact";

    contactDiv.innerHTML = `
        <strong>${contact.firstName} ${contact.lastName}</strong><br>
        📞 ${contact.phone}<br>
        📧 ${contact.email}
        <div class="contact-actions">
          <button class="edit-btn" data-index="${index}">Редагувати</button>
          <button class="delete-btn" data-index="${index}">Видалити</button>
        </div>
      `;

    contactList.appendChild(contactDiv);
  });
  
  document.querySelectorAll(".edit-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = btn.getAttribute("data-index");
      editContact(index);
    });
  });

  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = btn.getAttribute("data-index");
      deleteContact(index);
    });
  });
}

function editContact(index) {
  const contacts = getContacts();
  const contact = contacts[index];
  document.getElementById("firstName").value = contact.firstName;
  document.getElementById("lastName").value = contact.lastName;
  document.getElementById("phone").value = contact.phone;
  document.getElementById("email").value = contact.email;
  editingIndex = index;
}

function deleteContact(index) {
  const contacts = getContacts();
  contacts.splice(index, 1);
  saveContacts(contacts);
  renderContacts();
}

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!firstName || !lastName || !phone || !email) return;

  const contacts = getContacts();

  if (editingIndex !== null) {
    contacts[editingIndex] = { firstName, lastName, phone, email };
    editingIndex = null;
  } else {
    contacts.push({ firstName, lastName, phone, email });
  }

  saveContacts(contacts);
  renderContacts();
  this.reset();
});

renderContacts();
