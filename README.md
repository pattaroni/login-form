Kyryk Oleksii 585-Cybersecurity

HOMEWORK - LOGIN FORM

Lab 2: letter-by-letter name output on form submit.

Lab 4: registration panel with client-side validation:

- fields: first name, last name, email, password + show/hide password checkbox;
- live validation on every input (error message under each field);
- green border for a valid field, red border for an invalid one;
- Submit button is disabled until all fields are valid;
- valid data is printed to the console (console.log) and shown in a pop-up.

Lab 5: data encryption in a web app:

- three pages: login / registration (`/`), admin page (`/admin`), user page (`/user`);
- admin data is stored in a JSON database on the server (`data/db.json`) and checked through the `/api/login` API route;
- on registration user data is encrypted with the Vigenere cipher (symmetric key) and saved to Local Storage;
- the admin page shows a table of all users with decrypted data;
- the user page contains information about symmetric encryption.

Admin: admin@admin.com / Admin123!

Run locally:

```bash
npm install
npm run dev
```
