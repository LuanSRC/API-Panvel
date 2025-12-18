import fs from "fs";

const DATA_FILE = "../data/users.json";

// Controller functions
function readUsers() {
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
}

function writeUsers(users) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
}

// GET
export function list(req, res) {
  res.json(readUsers());
}

export function getById(req, res) {
  const users = readUsers();
  res.json(users.find((u) => u.id == req.params.id));
}

// POST
export function create(req, res) {
  const users = readUsers();
  const user = {
    id: Date.now(), // Cria uma instância de data atual como id
    nome: req.body.nome,
    email: req.body.email,
  };
  users.push(user);
  writeUsers(users);

  res.status(201).json(user);
}

// PUT
export function update(req, res) {
  const users = readUsers();
  const user = users.find((u) => u.id == req.params.id);

  user.nome = req.body.nome;
  user.email = req.body.email;

  writeUsers(users);
  res.json(user);
}

// DELETE
export function remove(req, res) {
  const users = readUsers().filter((u) => u.id != req.params.id);
  writeUsers(users);
  res.status(204).send();
}
