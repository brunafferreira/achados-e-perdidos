export type AccessLevel = "Aluno" | "Responsável";
export type ItemStatus = "Disponível" | "Devolvido";

export type User = {
  id: string;
  name: string;
  registration: string;
  email: string;
  phone: string;
  password: string;
  role: AccessLevel;
};

export type FoundItem = {
  id: string;
  name: string;
  category: string;
  description: string;
  characteristics: string;
  location: string;
  date: string;
  status: ItemStatus;
  image: string;
  createdAt: string;
};

export type Registry = {
  /** Users created by a responsible; built-in accounts remain source-controlled. */
  users: User[];
  items: FoundItem[];
};

const REGISTRY_KEY = "achados-perdidos-registry-v1";
export const SESSION_KEY = "achados-perdidos-session-v1";
const DEMO_ITEM_IDS = new Set([
  "item-caderno",
  "item-garrafa",
  "item-blusa",
  "item-lapis",
  "item-chave",
]);

export const BUILTIN_USERS: User[] = [
  {
    id: "demo-admin",
    name: "Responsável Demonstração",
    registration: "admin",
    email: "responsavel@escola.edu.br",
    phone: "(00) 00000-0000",
    password: "admin123",
    role: "Responsável",
  },
  {
    id: "demo-student",
    name: "Aluno Demonstração",
    registration: "2026001",
    email: "aluno@escola.edu.br",
    phone: "(00) 00000-0000",
    password: "aluno123",
    role: "Aluno",
  },
];

export function isBuiltinUser(userId: string): boolean {
  return BUILTIN_USERS.some((user) => user.id === userId);
}

export const CATEGORIES = [
  "Material escolar",
  "Documentos e cartões",
  "Roupas e acessórios",
  "Garrafas e recipientes",
  "Eletrônicos",
  "Chaves",
  "Outros objetos",
];

function createSeedRegistry(): Registry {
  return {
    users: [],
    items: [],
  };
}

function isUser(value: unknown): value is User {
  if (typeof value !== "object" || value === null) return false;
  const user = value as Record<string, unknown>;
  return (
    typeof user.id === "string" &&
    typeof user.name === "string" &&
    typeof user.registration === "string" &&
    typeof user.email === "string" &&
    typeof user.phone === "string" &&
    typeof user.password === "string" &&
    (user.role === "Aluno" || user.role === "Responsável")
  );
}

function isFoundItem(value: unknown): value is FoundItem {
  if (typeof value !== "object" || value === null) return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.id === "string" &&
    typeof item.name === "string" &&
    typeof item.category === "string" &&
    typeof item.description === "string" &&
    typeof item.characteristics === "string" &&
    typeof item.location === "string" &&
    typeof item.date === "string" &&
    (item.status === "Disponível" || item.status === "Devolvido") &&
    typeof item.image === "string" &&
    typeof item.createdAt === "string"
  );
}

function isRegistry(value: unknown): value is Registry {
  if (typeof value !== "object" || value === null) return false;
  const registry = value as Record<string, unknown>;
  return (
    Array.isArray(registry.users) &&
    registry.users.every(isUser) &&
    Array.isArray(registry.items) &&
    registry.items.every(isFoundItem)
  );
}

export function loadRegistry(): Registry {
  const saved = window.localStorage.getItem(REGISTRY_KEY);
  if (saved === null) {
    const initial = createSeedRegistry();
    window.localStorage.setItem(REGISTRY_KEY, JSON.stringify(initial));
    return initial;
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(saved);
  } catch {
    throw new Error("Os dados salvos estão inválidos. Limpe os dados do site para reiniciar a demonstração.");
  }
  if (!isRegistry(parsed)) {
    throw new Error("A estrutura dos dados locais está inválida. Limpe os dados do site para reiniciar a demonstração.");
  }
  const registry: Registry = {
    ...parsed,
    users: parsed.users.filter((user) => !isBuiltinUser(user.id)),
    items: parsed.items.filter((item) => !DEMO_ITEM_IDS.has(item.id)),
  };
  if (registry.items.length !== parsed.items.length) {
    window.localStorage.setItem(REGISTRY_KEY, JSON.stringify(registry));
  }
  return registry;
}

export function saveRegistry(registry: Registry): void {
  window.localStorage.setItem(REGISTRY_KEY, JSON.stringify(registry));
}
