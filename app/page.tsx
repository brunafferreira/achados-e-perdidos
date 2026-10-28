"use client";

import Image from "next/image";
import { FormEvent, ReactNode, useEffect, useMemo, useState } from "react";
import {
  AccessLevel,
  BUILTIN_USERS,
  CATEGORIES,
  FoundItem,
  isBuiltinUser,
  ItemStatus,
  loadRegistry,
  Registry,
  saveRegistry,
  SESSION_KEY,
  User,
} from "./lib/registry";

type View = "overview" | "items" | "users" | "team";
type ItemDraft = Omit<FoundItem, "id" | "createdAt">;
type UserDraft = Omit<User, "id">;
type IconName =
  | "home"
  | "box"
  | "users"
  | "search"
  | "plus"
  | "logout"
  | "pin"
  | "calendar"
  | "chevron"
  | "close"
  | "edit"
  | "camera"
  | "shield"
  | "check"
  | "spark"
  | "arrow"
  | "book"
  | "heart"
  | "graduation";

const iconContent: Record<IconName, ReactNode> = {
  home: <><path d="m3 10 9-7 9 7" /><path d="M5 9v11h14V9M9 20v-6h6v6" /></>,
  box: <><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="M3 8v9l9 5 9-5V8M12 13v9" /></>,
  users: <><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="10" cy="7" r="4" /><path d="M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
  plus: <><path d="M12 5v14M5 12h14" /></>,
  logout: <><path d="M10 17l5-5-5-5M15 12H3" /><path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7" /></>,
  pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 11h18" /></>,
  chevron: <><path d="m9 18 6-6-6-6" /></>,
  close: <><path d="m18 6-12 12M6 6l12 12" /></>,
  edit: <><path d="m15 5 4 4M4 20l4-.8L19 8a2.1 2.1 0 0 0-3-3L5 16l-1 4Z" /></>,
  camera: <><path d="M14 5h-4L8 8H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-3l-2-3Z" /><circle cx="12" cy="13" r="3" /></>,
  shield: <><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" /><path d="m9 12 2 2 4-4" /></>,
  check: <><path d="m5 12 4 4L19 6" /></>,
  spark: <><path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" /><path d="m19 14 .9 2.1L22 17l-2.1.9L19 20l-.9-2.1L16 17l2.1-.9L19 14Z" /></>,
  arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
  book: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" /></>,
  heart: <><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" /></>,
  graduation: <><path d="m2 10 10-5 10 5-10 5-10-5Z" /><path d="M6 12v5c3.5 3 8.5 3 12 0v-5M22 10v6" /></>,
};

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {iconContent[name]}
    </svg>
  );
}

const emptyItem: ItemDraft = {
  name: "",
  category: CATEGORIES[0],
  description: "",
  characteristics: "",
  location: "",
  date: new Date().toISOString().slice(0, 10),
  status: "Disponível",
  image: "",
};

const emptyUser: UserDraft = {
  name: "",
  registration: "",
  email: "",
  phone: "",
  password: "",
  role: "Aluno",
};

function formatDate(date: string) {
  if (!date) return "Data não informada";
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium", timeZone: "UTC" }).format(
    new Date(`${date}T00:00:00.000Z`),
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

async function imageAsDataUrl(file: File): Promise<string> {
  if (!file.type.startsWith("image/")) {
    throw new Error("Escolha um arquivo de imagem.");
  }
  if (file.size > 400 * 1024) {
    throw new Error("A imagem deve ter no máximo 400 KB para caber no armazenamento do navegador.");
  }
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") resolve(reader.result);
      else reject(new Error("Não foi possível carregar a imagem."));
    };
    reader.onerror = () => reject(new Error("Não foi possível ler a imagem selecionada."));
    reader.readAsDataURL(file);
  });
}

export default function Home() {
  const [registry, setRegistry] = useState<Registry>({ users: [], items: [] });
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  const [storageError, setStorageError] = useState("");
  const [notice, setNotice] = useState("");
  const [loginRegistration, setLoginRegistration] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [view, setView] = useState<View>("overview");
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Todas as categorias");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [locationFilter, setLocationFilter] = useState("Todos os locais");
  const [dateFilter, setDateFilter] = useState("");
  const [selectedItem, setSelectedItem] = useState<FoundItem | null>(null);
  const [itemBeingEdited, setItemBeingEdited] = useState<FoundItem | null>(null);
  const [userBeingEdited, setUserBeingEdited] = useState<User | null>(null);
  const [itemDialogOpen, setItemDialogOpen] = useState(false);
  const [userDialogOpen, setUserDialogOpen] = useState(false);
  const [itemDraft, setItemDraft] = useState<ItemDraft>(emptyItem);
  const [userDraft, setUserDraft] = useState<UserDraft>(emptyUser);
  const [formError, setFormError] = useState("");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const loaded = loadRegistry();
        window.localStorage.removeItem(SESSION_KEY);
        setRegistry(loaded);
      } catch (error) {
        setStorageError(error instanceof Error ? error.message : "Não foi possível carregar os dados locais.");
      } finally {
        setReady(true);
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!notice) return;
    const timeout = window.setTimeout(() => setNotice(""), 3800);
    return () => window.clearTimeout(timeout);
  }, [notice]);

  const isManager = currentUser?.role === "Responsável";
  const allUsers = useMemo(
    () => [...BUILTIN_USERS, ...registry.users],
    [registry.users],
  );
  const locations = useMemo(
    () => [...new Set(registry.items.map((item) => item.location))].sort((a, b) => a.localeCompare(b)),
    [registry.items],
  );
  const availableCount = registry.items.filter((item) => item.status === "Disponível").length;
  const returnedCount = registry.items.filter((item) => item.status === "Devolvido").length;
  const visibleItems = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("pt-BR");
    return registry.items
      .filter((item) => {
        const searchable = [
          item.name,
          item.category,
          item.description,
          item.characteristics,
          item.location,
          item.status,
        ]
          .join(" ")
          .toLocaleLowerCase("pt-BR");
        return (
          (!normalizedQuery || searchable.includes(normalizedQuery)) &&
          (categoryFilter === "Todas as categorias" || item.category === categoryFilter) &&
          (statusFilter === "Todos" || item.status === statusFilter) &&
          (locationFilter === "Todos os locais" || item.location === locationFilter) &&
          (!dateFilter || item.date === dateFilter)
        );
      })
      .sort((a, b) => {
        if (a.status !== b.status) return a.status === "Disponível" ? -1 : 1;
        return b.date.localeCompare(a.date);
      });
  }, [categoryFilter, dateFilter, locationFilter, query, registry.items, statusFilter]);

  function persist(nextRegistry: Registry, successMessage: string) {
    try {
      saveRegistry(nextRegistry);
      setRegistry(nextRegistry);
      setStorageError("");
      setNotice(successMessage);
      return true;
    } catch {
      setStorageError("Não foi possível salvar. O armazenamento do navegador pode estar cheio; tente remover uma foto ou limpar espaço.");
      return false;
    }
  }

  function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoginError("");
    const user = allUsers.find(
      (candidate) =>
        candidate.registration.trim().toLocaleLowerCase("pt-BR") ===
          loginRegistration.trim().toLocaleLowerCase("pt-BR") &&
        candidate.password === loginPassword,
    );
    if (!user) {
      setLoginError("Matrícula ou senha incorreta. Confira os dados e tente novamente.");
      return;
    }
    try {
      window.localStorage.setItem(SESSION_KEY, user.id);
      setCurrentUser(user);
      setLoginRegistration("");
      setLoginPassword("");
      setView("overview");
      setNotice(`Boas-vindas, ${user.name.split(" ")[0]}!`);
    } catch {
      setLoginError("Não foi possível salvar a sessão neste navegador.");
    }
  }

  function signOut() {
    try {
      window.localStorage.removeItem(SESSION_KEY);
      setCurrentUser(null);
      setLoginRegistration("");
      setLoginPassword("");
      setView("overview");
      setNotice("Você saiu da sua conta.");
    } catch {
      setStorageError("Não foi possível encerrar a sessão neste navegador.");
    }
  }

  function authorizeManager() {
    let savedSession: string | null = null;
    try {
      savedSession = window.localStorage.getItem(SESSION_KEY);
    } catch {
      setStorageError("Não foi possível validar a sessão neste navegador.");
      return false;
    }
    const activeRegistryUser = allUsers.find((user) => user.id === currentUser?.id);
    if (
      !currentUser ||
      currentUser.role !== "Responsável" ||
      activeRegistryUser?.role !== "Responsável" ||
      savedSession !== currentUser.id
    ) {
      try {
        window.localStorage.removeItem(SESSION_KEY);
      } catch {
        setStorageError("Não foi possível encerrar uma sessão sem permissão.");
      }
      setCurrentUser(null);
      setView("overview");
      setItemDialogOpen(false);
      setUserDialogOpen(false);
      setNotice("Acesso restrito a responsáveis. Entre novamente com uma conta autorizada.");
      return false;
    }
    return true;
  }

  function openNewItem() {
    if (!authorizeManager()) return;
    setItemBeingEdited(null);
    setItemDraft(emptyItem);
    setItemDialogOpen(true);
    setFormError("");
  }

  function openEditItem(item: FoundItem) {
    if (!authorizeManager()) return;
    setSelectedItem(null);
    setItemBeingEdited(item);
    setItemDialogOpen(true);
    setItemDraft({
      name: item.name,
      category: item.category,
      description: item.description,
      characteristics: item.characteristics,
      location: item.location,
      date: item.date,
      status: item.status,
      image: item.image,
    });
    setFormError("");
  }

  function saveItem(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!authorizeManager()) return;
    const required = [itemDraft.name, itemDraft.category, itemDraft.description, itemDraft.characteristics, itemDraft.location, itemDraft.date];
    if (required.some((field) => !field.trim())) {
      setFormError("Preencha todos os campos obrigatórios.");
      return;
    }
    const nextItem: FoundItem = itemBeingEdited
      ? { ...itemBeingEdited, ...itemDraft }
      : {
          ...itemDraft,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        };
    const nextRegistry = {
      ...registry,
      items: itemBeingEdited
        ? registry.items.map((item) => (item.id === itemBeingEdited.id ? nextItem : item))
        : [nextItem, ...registry.items],
    };
    if (persist(nextRegistry, itemBeingEdited ? "Objeto atualizado com sucesso." : "Objeto cadastrado com sucesso.")) {
      setItemBeingEdited(null);
      setItemDialogOpen(false);
      setFormError("");
      setView("items");
    }
  }

  function deleteItem(item: FoundItem) {
    if (!authorizeManager() || !window.confirm(`Excluir “${item.name}” permanentemente?`)) return;
    if (persist({ ...registry, items: registry.items.filter((entry) => entry.id !== item.id) }, "Objeto excluído.")) {
      setSelectedItem(null);
    }
  }

  function openNewUser() {
    if (!authorizeManager()) return;
    setUserBeingEdited(null);
    setUserDraft(emptyUser);
    setUserDialogOpen(true);
    setFormError("");
  }

  function openEditUser(user: User) {
    if (!authorizeManager()) return;
    if (isBuiltinUser(user.id)) {
      setNotice("As contas iniciais são fixas e não podem ser alteradas.");
      return;
    }
    setUserBeingEdited(user);
    setUserDialogOpen(true);
    setUserDraft({
      name: user.name,
      registration: user.registration,
      email: user.email,
      phone: user.phone,
      password: user.password,
      role: user.role,
    });
    setFormError("");
  }

  function saveUser(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!authorizeManager()) return;
    if (userBeingEdited && isBuiltinUser(userBeingEdited.id)) {
      setFormError("As contas iniciais são fixas e não podem ser alteradas.");
      return;
    }
    if ([userDraft.name, userDraft.registration, userDraft.email, userDraft.phone, userDraft.password].some((field) => !field.trim())) {
      setFormError("Preencha nome, matrícula, e-mail, telefone e senha.");
      return;
    }
    const duplicate = allUsers.some(
      (user) =>
        user.registration.trim().toLocaleLowerCase("pt-BR") ===
          userDraft.registration.trim().toLocaleLowerCase("pt-BR") &&
        user.id !== userBeingEdited?.id,
    );
    if (duplicate) {
      setFormError("Esta matrícula já está cadastrada. Informe uma matrícula diferente.");
      return;
    }
    const remainingManagers = allUsers.filter(
      (user) => user.role === "Responsável" && user.id !== userBeingEdited?.id,
    );
    if (userBeingEdited?.role === "Responsável" && userDraft.role !== "Responsável" && remainingManagers.length === 0) {
      setFormError("Não é possível remover o último responsável. Cadastre outro responsável antes de alterar esta permissão.");
      return;
    }
    const nextUser: User = userBeingEdited
      ? { ...userBeingEdited, ...userDraft, registration: userDraft.registration.trim() }
      : {
          ...userDraft,
          id: crypto.randomUUID(),
          registration: userDraft.registration.trim(),
        };
    const nextRegistry = {
      ...registry,
      users: userBeingEdited
        ? registry.users.map((user) => (user.id === userBeingEdited.id ? nextUser : user))
        : [...registry.users, nextUser],
    };
    if (persist(nextRegistry, userBeingEdited ? "Usuário atualizado." : "Usuário autorizado cadastrado.")) {
      if (currentUser?.id === nextUser.id) setCurrentUser(nextUser);
      setUserBeingEdited(null);
      setUserDialogOpen(false);
      setFormError("");
      if (currentUser?.id === nextUser.id && nextUser.role !== "Responsável") setView("overview");
    }
  }

  function deleteUser(user: User) {
    if (!authorizeManager()) return;
    if (isBuiltinUser(user.id)) {
      setNotice("As contas iniciais são fixas e não podem ser excluídas.");
      return;
    }
    if (!window.confirm(`Excluir o acesso de ${user.name}?`)) return;
    const remainingManagers = allUsers.filter(
      (entry) => entry.id !== user.id && entry.role === "Responsável",
    );
    if (user.role === "Responsável" && remainingManagers.length === 0) {
      setNotice("Mantenha pelo menos um responsável cadastrado.");
      return;
    }
    if (user.id === currentUser?.id) {
      setNotice("Você não pode excluir o usuário que está usando agora.");
      return;
    }
    persist({ ...registry, users: registry.users.filter((entry) => entry.id !== user.id) }, "Acesso do usuário removido.");
  }

  async function handleImage(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const image = await imageAsDataUrl(file);
      setItemDraft((draft) => ({ ...draft, image }));
      setFormError("");
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Não foi possível carregar essa imagem.");
    }
    event.target.value = "";
  }

  function clearFilters() {
    setQuery("");
    setCategoryFilter("Todas as categorias");
    setStatusFilter("Todos");
    setLocationFilter("Todos os locais");
    setDateFilter("");
  }

  if (!ready) {
    return <main className="loading-screen"><span className="brand-mark"><Icon name="spark" size={22} /></span><p>Preparando seu espaço...</p></main>;
  }

  if (storageError && registry.users.length === 0) {
    return (
      <main className="storage-screen">
        <span className="brand-mark"><Icon name="shield" size={22} /></span>
        <p className="eyebrow">Achados &amp; Perdidos</p>
        <h1>Não foi possível abrir os dados locais</h1>
        <p>{storageError}</p>
        <p className="muted">O navegador precisa permitir o armazenamento local para esta demonstração.</p>
      </main>
    );
  }

  if (!currentUser) {
    return (
      <main className="login-page">
        <section className="login-story">
          <div className="login-brand">
            <span className="brand-mark"><Icon name="spark" size={22} /></span>
            <span>Achados<span className="brand-amp">&amp;</span>Perdidos</span>
          </div>
          <div className="story-copy">
            <span className="eyebrow light-eyebrow">UM JEITO MAIS FÁCIL DE ENCONTRAR</span>
            <h1>Seu próximo reencontro pode começar por aqui.</h1>
            <p>Consulte os itens encontrados na escola com praticidade. Pesquise, confira os detalhes e saiba onde buscar.</p>
          </div>
          <div className="story-card">
            <div className="story-card-photo"><Icon name="box" size={30} /></div>
            <div><span className="eyebrow">NO ACHADOS E PERDIDOS</span><strong>Uma nova chance de reencontrar</strong></div>
            <span className="story-card-dot" />
          </div>
          <div className="story-foot"><span>Feito para aproximar você do que importa.</span><span>Projeto escolar • 2026</span></div>
          <div className="story-decoration story-decoration-one" />
          <div className="story-decoration story-decoration-two" />
        </section>
        <section className="login-panel">
          <div className="login-form-wrap">
            <div className="login-welcome">
              <span className="eyebrow">BEM-VINDO(A) DE VOLTA</span>
              <h2>Entre na sua conta</h2>
              <p>Use sua matrícula e senha para acessar o sistema.</p>
            </div>
            <form autoComplete="off" className="login-form" onSubmit={signIn}>
              <label htmlFor="login-registration">Matrícula</label>
              <input
                autoComplete="off"
                id="login-registration"
                onChange={(event) => setLoginRegistration(event.target.value)}
                placeholder="Digite sua matrícula"
                required
                value={loginRegistration}
              />
              <label htmlFor="login-password">Senha</label>
              <input
                autoComplete="off"
                id="login-password"
                onChange={(event) => setLoginPassword(event.target.value)}
                placeholder="Digite sua senha"
                required
                type="password"
                value={loginPassword}
              />
              {loginError && <p className="form-error" role="alert">{loginError}</p>}
              <button
                className="button button-primary login-submit"
                disabled={!loginRegistration.trim() || !loginPassword}
                type="submit"
              >
                Entrar <Icon name="arrow" size={17} />
              </button>
            </form>
            <p className="login-disclaimer">Projeto didático. Não use senhas reais ou dados pessoais sensíveis.</p>
          </div>
          <footer className="login-footer">© 2026 Achados &amp; Perdidos Escolar</footer>
        </section>
      </main>
    );
  }

  const pageTitle =
    view === "overview"
      ? "Visão geral"
      : view === "items"
        ? "Objetos encontrados"
        : view === "users"
          ? "Usuários autorizados"
          : "Nossa equipe";
  const pageDescription =
    view === "overview"
      ? "Acompanhe os objetos e encontre o que você procura."
      : view === "items"
        ? "Pesquise e consulte os itens encontrados na escola."
        : view === "users"
          ? "Gerencie quem pode acessar a plataforma."
          : "Conheça as pessoas por trás deste projeto escolar.";

  return (
    <div className="app-shell">
      {mobileNavOpen && <button aria-label="Fechar menu" className="nav-scrim" onClick={() => setMobileNavOpen(false)} />}
      <aside className={`sidebar ${mobileNavOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-brand">
          <span className="brand-mark"><Icon name="spark" size={21} /></span>
          <span>Achados<span className="brand-amp">&amp;</span>Perdidos<small>ESCOLAR</small></span>
          <button aria-label="Fechar menu" className="mobile-close" onClick={() => setMobileNavOpen(false)}><Icon name="close" /></button>
        </div>
        <div className="school-label"><span className="school-dot" /> ESPAÇO DA ESCOLA</div>
        <nav className="side-nav" aria-label="Navegação principal">
          <span className="nav-heading">MENU</span>
          <button className={`nav-link ${view === "overview" ? "active" : ""}`} onClick={() => { setView("overview"); setMobileNavOpen(false); }}>
            <Icon name="home" /><span>Visão geral</span>
          </button>
          <button className={`nav-link ${view === "items" ? "active" : ""}`} onClick={() => { setView("items"); setMobileNavOpen(false); }}>
            <Icon name="box" /><span>Objetos encontrados</span><span className="nav-count">{availableCount}</span>
          </button>
          <button className={`nav-link ${view === "team" ? "active" : ""}`} onClick={() => { setView("team"); setMobileNavOpen(false); }}>
            <Icon name="graduation" /><span>Nossa equipe</span>
          </button>
          {isManager && (
            <button className={`nav-link ${view === "users" ? "active" : ""}`} onClick={() => { setView("users"); setMobileNavOpen(false); }}>
              <Icon name="users" /><span>Usuários</span>
            </button>
          )}
        </nav>
        <div className="sidebar-note">
          <span className="note-icon"><Icon name="spark" size={17} /></span>
          <strong>Perdeu alguma coisa?</strong>
          <p>Pesquise nos objetos e confira os detalhes antes de ir até a escola.</p>
          <button onClick={() => { setView("items"); setMobileNavOpen(false); }}>Buscar objeto <Icon name="arrow" size={15} /></button>
        </div>
        <div className="sidebar-bottom">
          <div className="security-note"><Icon name="shield" size={16} /><span>Ambiente demonstrativo<br /><small>Seus dados ficam neste navegador.</small></span></div>
          <div className="sidebar-profile">
            <span className="avatar">{initials(currentUser.name)}</span>
            <span className="profile-text"><strong>{currentUser.name}</strong><small>{currentUser.role}</small></span>
            <button aria-label="Sair da conta" className="icon-button logout-button" onClick={signOut} title="Sair"><Icon name="logout" size={17} /></button>
          </div>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <button aria-label="Abrir menu" className="mobile-menu icon-button" onClick={() => setMobileNavOpen(true)}><span>☰</span></button>
          <div className="breadcrumb"><span>Início</span><Icon name="chevron" size={14} /><strong>{pageTitle}</strong></div>
          <div className="topbar-right">
            <span className="local-indicator"><span /> Dados salvos neste dispositivo</span>
            <span className="topbar-avatar">{initials(currentUser.name)}</span>
          </div>
        </header>

        <div className="content-wrap">
          {storageError && <div className="storage-warning" role="alert"><Icon name="shield" size={17} />{storageError}</div>}
          <div className="page-heading">
            <div>
              <span className="eyebrow">{isManager ? "PAINEL DO RESPONSÁVEL" : "CONSULTA ESCOLAR"}</span>
              <h1>{view === "overview" ? <>Olá, {currentUser.name.split(" ")[0]} <span className="greeting-wave">✳</span></> : pageTitle}</h1>
              <p>{pageDescription}</p>
            </div>
            {isManager && view !== "users" && (
              <button className="button button-primary" onClick={() => { openNewItem(); }}><Icon name="plus" /> Cadastrar objeto</button>
            )}
            {isManager && view === "users" && (
              <button className="button button-primary" onClick={openNewUser}><Icon name="plus" /> Novo usuário</button>
            )}
          </div>

          {view === "overview" && (
            <>
              <section className="welcome-banner">
                <div className="banner-copy">
                  <span className="banner-kicker"><Icon name="spark" size={15} /> TODO REENCONTRO COMEÇA COM UMA BUSCA</span>
                  <h2>Vamos encontrar o que você perdeu?</h2>
                  <p>Veja os itens encontrados e confira se algum deles é seu.</p>
                  <button className="button button-light" onClick={() => setView("items")}>Explorar objetos <Icon name="arrow" size={16} /></button>
                </div>
                <div className="banner-art" aria-hidden="true">
                  <div className="art-ring art-ring-one" /><div className="art-ring art-ring-two" />
                  <div className="art-card art-card-back"><span>✦</span></div>
                  <div className="art-card art-card-front"><Icon name="box" size={42} /><span>reencontrar</span></div>
                  <span className="art-star art-star-one">✳</span><span className="art-star art-star-two">✦</span>
                </div>
              </section>

              <section className="stats-grid" aria-label="Resumo dos objetos">
                <article className="stat-card"><span className="stat-icon stat-icon-green"><Icon name="box" /></span><span className="stat-label">Objetos cadastrados</span><strong>{registry.items.length.toString().padStart(2, "0")}</strong><small>no espaço de achados</small></article>
                <article className="stat-card"><span className="stat-icon stat-icon-yellow"><Icon name="spark" /></span><span className="stat-label">Disponíveis</span><strong>{availableCount.toString().padStart(2, "0")}</strong><small>aguardando reencontro</small></article>
                <article className="stat-card"><span className="stat-icon stat-icon-blue"><Icon name="check" /></span><span className="stat-label">Devolvidos</span><strong>{returnedCount.toString().padStart(2, "0")}</strong><small>já voltaram para casa</small></article>
              </section>

              <section className="section-block">
                <div className="section-heading">
                  <div><span className="eyebrow">ATUALIZADOS RECENTEMENTE</span><h2>Veja o que chegou por aqui</h2></div>
                  <button className="text-button" onClick={() => setView("items")}>Ver todos <Icon name="arrow" size={15} /></button>
                </div>
                <div className="item-grid">
                  {visibleItems.slice(0, 3).map((item) => <ItemCard key={item.id} item={item} onOpen={setSelectedItem} />)}
                  {visibleItems.length === 0 && <div className="empty-state"><span className="empty-illustration"><Icon name="search" size={27} /></span><strong>Nenhum objeto por enquanto</strong><p>Quando um item for cadastrado, ele aparece aqui.</p></div>}
                </div>
              </section>
              <div className="tip-strip"><span className="tip-icon"><Icon name="spark" size={16} /></span><p><strong>Dica:</strong> use as características, o local e a data para reconhecer seu objeto com mais facilidade.</p><button className="text-button" onClick={() => setView("items")}>Começar busca <Icon name="arrow" size={15} /></button></div>
            </>
          )}

          {view === "items" && (
            <section className="listing-section">
              <div className="listing-tools">
                <label className="search-field"><Icon name="search" size={18} /><input aria-label="Pesquisar objetos" onChange={(event) => setQuery(event.target.value)} placeholder="Busque por nome, característica ou local..." value={query} />{query && <button aria-label="Limpar pesquisa" onClick={() => setQuery("")}><Icon name="close" size={16} /></button>}</label>
                <div className="filter-field"><span>Categoria</span><select aria-label="Filtrar por categoria" onChange={(event) => setCategoryFilter(event.target.value)} value={categoryFilter}><option>Todas as categorias</option>{CATEGORIES.map((category) => <option key={category}>{category}</option>)}</select></div>
                <div className="filter-field"><span>Situação</span><select aria-label="Filtrar por situação" onChange={(event) => setStatusFilter(event.target.value)} value={statusFilter}><option>Todos</option><option>Disponível</option><option>Devolvido</option></select></div>
                <div className="filter-field"><span>Local</span><select aria-label="Filtrar por local" onChange={(event) => setLocationFilter(event.target.value)} value={locationFilter}><option>Todos os locais</option>{locations.map((location) => <option key={location}>{location}</option>)}</select></div>
                <label className="filter-field date-filter"><span>Data do achado</span><input aria-label="Filtrar pela data do achado" onChange={(event) => setDateFilter(event.target.value)} type="date" value={dateFilter} /></label>
              </div>
              <div className="results-row"><span><strong>{visibleItems.length}</strong> {visibleItems.length === 1 ? "objeto encontrado" : "objetos encontrados"}</span><button className="reset-filters" onClick={clearFilters}>Limpar filtros</button></div>
              {visibleItems.length > 0 ? (
                <div className="item-grid item-grid-listing">{visibleItems.map((item) => <ItemCard key={item.id} item={item} onOpen={setSelectedItem} onEdit={isManager ? openEditItem : undefined} />)}</div>
              ) : (
                <div className="empty-state empty-large"><span className="empty-illustration"><Icon name="search" size={28} /></span><strong>Nenhum resultado encontrado</strong><p>Tente buscar por outro termo ou ajustar os filtros.</p><button className="button button-outline" onClick={clearFilters}>Limpar filtros</button></div>
              )}
            </section>
          )}

          {view === "users" && isManager && (
            <section className="users-section">
              <div className="users-intro"><div className="users-intro-icon"><Icon name="shield" size={21} /></div><div><strong>Acesso controlado pela equipe escolar</strong><p>Somente pessoas autorizadas devem receber acesso. As senhas desta demonstração ficam salvas localmente.</p></div></div>
              <div className="table-wrap">
                <table className="users-table">
                  <thead><tr><th>USUÁRIO</th><th>MATRÍCULA</th><th>CONTATO</th><th>PERMISSÃO</th><th><span className="visually-hidden">Ações</span></th></tr></thead>
                  <tbody>{allUsers.map((user) => (
                    <tr key={user.id}>
                      <td><div className="table-user"><span className={`avatar ${user.role === "Responsável" ? "avatar-manager" : ""}`}>{initials(user.name)}</span><span><strong>{user.name}</strong><small>{user.email}</small></span></div></td>
                      <td className="registration-cell">{user.registration}</td>
                      <td className="phone-cell">{user.phone || "—"}</td>
                      <td><span className={`role-pill ${user.role === "Responsável" ? "role-manager" : ""}`}><span />{user.role}</span></td>
                      <td>
                        {isBuiltinUser(user.id) ? (
                          <span className="fixed-account-label">Conta inicial fixa</span>
                        ) : (
                          <div className="table-actions"><button aria-label={`Editar ${user.name}`} className="icon-button" onClick={() => openEditUser(user)} title="Editar"><Icon name="edit" size={16} /></button><button aria-label={`Excluir ${user.name}`} className="icon-button danger-icon" onClick={() => deleteUser(user)} title="Excluir"><Icon name="close" size={16} /></button></div>
                        )}
                      </td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
              <p className="users-footnote">Usuários e objetos ficam salvos neste navegador e perfil, mesmo após fechar e reabrir. Não há sincronização entre dispositivos.</p>
            </section>
          )}
          {view === "team" && (
            <section className="team-section">
              <div className="team-banner">
                <span className="team-banner-icon"><Icon name="heart" size={25} /></span>
                <div>
                  <span className="eyebrow">PROJETO ESCOLAR · 2026</span>
                  <h2>Uma ideia feita em equipe.</h2>
                  <p>Este projeto nasceu para ajudar a comunidade escolar a reencontrar objetos perdidos de um jeito mais simples e acolhedor.</p>
                </div>
                <div className="team-banner-decoration" aria-hidden="true"><Icon name="graduation" size={58} /></div>
              </div>
              <div className="section-heading team-heading">
                <div><span className="eyebrow">QUEM FAZ ACONTECER</span><h2>Conheça nossa equipe</h2></div>
                <span className="team-count">03 integrantes</span>
              </div>
              <div className="team-grid">
                {[
                  { name: "Ana Clara Silva Vila Nova", initials: "AC", color: "team-sage" },
                  { name: "Bruna Ferreira da Silva", initials: "BF", color: "team-sand" },
                  { name: "Júlia Gomes Teixeira", initials: "JG", color: "team-lilac" },
                ].map((member) => (
                  <article className="team-card" key={member.name}>
                    <div className={`team-avatar ${member.color}`}>{member.initials}</div>
                    <span className="team-role"><Icon name="graduation" size={13} /> Equipe de desenvolvimento</span>
                    <h3>{member.name}</h3>
                    <p>Integrante do grupo responsável pelo planejamento e desenvolvimento desta solução para a comunidade escolar.</p>
                    <div className="team-card-foot"><span><Icon name="heart" size={14} /> Achados &amp; Perdidos Escolar</span><span className="team-active-dot" /></div>
                  </article>
                ))}
              </div>
              <div className="team-purpose">
                <span className="team-purpose-icon"><Icon name="book" size={20} /></span>
                <div><strong>Nosso propósito</strong><p>Facilitar a consulta de objetos encontrados e aproximar cada item de quem está sentindo falta dele.</p></div>
              </div>
            </section>
          )}
          <footer className="page-footer"><span>Achados &amp; Perdidos Escolar</span><span>Uma comunidade que cuida do que é de todos <span className="footer-heart">♥</span></span></footer>
        </div>
      </main>

      {notice && <div className="toast" role="status"><span><Icon name="check" size={17} /></span>{notice}<button aria-label="Fechar aviso" onClick={() => setNotice("")}><Icon name="close" size={15} /></button></div>}

      {selectedItem && (
        <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedItem(null); }}>
          <section aria-labelledby="detail-title" aria-modal="true" className="dialog detail-dialog" role="dialog">
            <button aria-label="Fechar detalhes" className="modal-close icon-button" onClick={() => setSelectedItem(null)}><Icon name="close" /></button>
            <div className={`detail-image ${selectedItem.image ? "has-image" : ""}`}>            {selectedItem.image ? <Image alt={selectedItem.name} height={640} src={selectedItem.image} unoptimized width={640} /> : <CategoryIllustration category={selectedItem.category} large />}</div>
            <div className="detail-content">
              <span className={`status-pill ${selectedItem.status === "Devolvido" ? "status-returned" : ""}`}><span />{selectedItem.status}</span>
              <h2 id="detail-title">{selectedItem.name}</h2>
              <span className="detail-category">{selectedItem.category}</span>
              <p className="detail-description">{selectedItem.description}</p>
              <div className="detail-characteristics"><span className="eyebrow">CARACTERÍSTICAS</span><p>{selectedItem.characteristics}</p></div>
              <div className="detail-meta"><span><Icon name="pin" size={16} /><span><small>Encontrado em</small><strong>{selectedItem.location}</strong></span></span><span><Icon name="calendar" size={16} /><span><small>Data do achado</small><strong>{formatDate(selectedItem.date)}</strong></span></span></div>
              <div className="detail-reminder"><Icon name="spark" size={17} /><p>{selectedItem.status === "Disponível" ? "Acha que é seu? Procure o responsável na escola para retirar o objeto." : "Este objeto já foi devolvido ao seu responsável."}</p></div>
              {isManager && <div className="dialog-actions"><button className="button button-outline" onClick={() => openEditItem(selectedItem)}><Icon name="edit" size={16} /> Editar objeto</button><button className="button button-danger" onClick={() => deleteItem(selectedItem)}>Excluir</button></div>}
            </div>
          </section>
        </div>
      )}

      {itemDialogOpen && isManager && (
        <ItemDialog
          draft={itemDraft}
          error={formError}
          isEditing={itemBeingEdited !== null}
          onChange={setItemDraft}
          onClose={() => { setItemBeingEdited(null); setItemDialogOpen(false); setFormError(""); }}
          onImage={handleImage}
          onRemoveImage={() => setItemDraft((draft) => ({ ...draft, image: "" }))}
          onSubmit={saveItem}
        />
      )}

      {userDialogOpen && isManager && (
        <UserDialog
          draft={userDraft}
          error={formError}
          isEditing={userBeingEdited !== null}
          onChange={setUserDraft}
          onClose={() => { setUserBeingEdited(null); setUserDialogOpen(false); setFormError(""); }}
          onSubmit={saveUser}
        />
      )}
    </div>
  );
}

function CategoryIllustration({ category, large = false }: { category: string; large?: boolean }) {
  const emoji =
    category === "Material escolar" ? "✎" :
      category === "Documentos e cartões" ? "▤" :
        category === "Roupas e acessórios" ? "⌁" :
          category === "Garrafas e recipientes" ? "◒" :
            category === "Eletrônicos" ? "▣" :
              category === "Chaves" ? "⚿" : "✦";
  return <span aria-hidden="true" className={`category-illustration ${large ? "illustration-large" : ""}`}>{emoji}</span>;
}

function ItemCard({
  item,
  onOpen,
  onEdit,
}: {
  item: FoundItem;
  onOpen: (item: FoundItem) => void;
  onEdit?: (item: FoundItem) => void;
}) {
  return (
    <article className="item-card">
      <button aria-label={`Ver detalhes de ${item.name}`} className={`item-card-visual ${item.image ? "item-card-photo" : ""}`} onClick={() => onOpen(item)}>
        {item.image ? <Image alt="" height={400} src={item.image} unoptimized width={600} /> : <CategoryIllustration category={item.category} />}
        <span className={`status-pill ${item.status === "Devolvido" ? "status-returned" : ""}`}><span />{item.status}</span>
      </button>
      <div className="item-card-content">
        <span className="item-category">{item.category}</span>
        <button className="item-name-button" onClick={() => onOpen(item)}><h3>{item.name}</h3></button>
        <p className="item-description">{item.characteristics}</p>
        <div className="item-card-meta"><span><Icon name="pin" size={14} />{item.location}</span><span><Icon name="calendar" size={14} />{formatDate(item.date)}</span></div>
        <div className="item-card-footer">
          <button className="detail-link" onClick={() => onOpen(item)}>Ver detalhes <Icon name="arrow" size={15} /></button>
          {onEdit && <button aria-label={`Editar ${item.name}`} className="card-edit icon-button" onClick={() => onEdit(item)} title="Editar objeto"><Icon name="edit" size={15} /></button>}
        </div>
      </div>
    </article>
  );
}

function ItemDialog({
  draft,
  error,
  isEditing,
  onChange,
  onClose,
  onImage,
  onRemoveImage,
  onSubmit,
}: {
  draft: ItemDraft;
  error: string;
  isEditing: boolean;
  onChange: (draft: ItemDraft) => void;
  onClose: () => void;
  onImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section aria-labelledby="item-dialog-title" aria-modal="true" className="dialog form-dialog" role="dialog">
        <div className="dialog-heading"><div><span className="eyebrow">GERENCIAR ACHADOS</span><h2 id="item-dialog-title">{isEditing ? "Editar objeto" : "Cadastrar objeto"}</h2><p>Preencha os detalhes para ajudar alguém a reconhecer o item.</p></div><button aria-label="Fechar formulário" className="icon-button" onClick={onClose}><Icon name="close" /></button></div>
        <form className="modal-form" onSubmit={onSubmit}>
          <label className="photo-upload">
            {draft.image ? <Image alt="Prévia do objeto" height={126} src={draft.image} unoptimized width={134} /> : <span className="upload-placeholder"><Icon name="camera" size={22} /><strong>Adicionar foto</strong><small>JPG ou PNG · até 400 KB</small></span>}
            <span className="upload-action">{draft.image ? "Trocar foto" : "Selecionar imagem"}</span>
            <input accept="image/*" aria-label="Selecionar foto do objeto" onChange={onImage} type="file" />
          </label>
          {draft.image && <button className="remove-photo" onClick={onRemoveImage} type="button">Remover foto</button>}
          <div className="form-grid">
            <label className="form-field form-full"><span>Nome do objeto <b>*</b></span><input maxLength={70} onChange={(event) => onChange({ ...draft, name: event.target.value })} placeholder="Ex.: Garrafa térmica verde" required value={draft.name} /></label>
            <label className="form-field"><span>Categoria <b>*</b></span><select onChange={(event) => onChange({ ...draft, category: event.target.value })} value={draft.category}>{CATEGORIES.map((category) => <option key={category}>{category}</option>)}</select></label>
            <label className="form-field"><span>Situação <b>*</b></span><select onChange={(event) => onChange({ ...draft, status: event.target.value as ItemStatus })} value={draft.status}><option>Disponível</option><option>Devolvido</option></select></label>
            <label className="form-field form-full"><span>Descrição <b>*</b></span><input maxLength={160} onChange={(event) => onChange({ ...draft, description: event.target.value })} placeholder="Descreva brevemente o objeto" required value={draft.description} /></label>
            <label className="form-field form-full"><span>Características <b>*</b></span><textarea maxLength={220} onChange={(event) => onChange({ ...draft, characteristics: event.target.value })} placeholder="Cor, marca, detalhes que ajudem a identificar..." required rows={2} value={draft.characteristics} /></label>
            <label className="form-field"><span>Local encontrado <b>*</b></span><input maxLength={70} onChange={(event) => onChange({ ...draft, location: event.target.value })} placeholder="Ex.: Biblioteca" required value={draft.location} /></label>
            <label className="form-field"><span>Data do achado <b>*</b></span><input onChange={(event) => onChange({ ...draft, date: event.target.value })} required type="date" value={draft.date} /></label>
          </div>
          {error && <p className="form-error" role="alert">{error}</p>}
          <div className="form-footer"><span><b>*</b> Campos obrigatórios</span><div><button className="button button-outline" onClick={onClose} type="button">Cancelar</button><button className="button button-primary" type="submit">{isEditing ? "Salvar alterações" : "Cadastrar objeto"}</button></div></div>
        </form>
      </section>
    </div>
  );
}

function UserDialog({
  draft,
  error,
  isEditing,
  onChange,
  onClose,
  onSubmit,
}: {
  draft: UserDraft;
  error: string;
  isEditing: boolean;
  onChange: (draft: UserDraft) => void;
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section aria-labelledby="user-dialog-title" aria-modal="true" className="dialog form-dialog user-dialog" role="dialog">
        <div className="dialog-heading"><div><span className="eyebrow">EQUIPE ESCOLAR</span><h2 id="user-dialog-title">{isEditing ? "Editar usuário" : "Novo usuário"}</h2><p>Cadastre somente pessoas autorizadas a usar a plataforma.</p></div><button aria-label="Fechar formulário" className="icon-button" onClick={onClose}><Icon name="close" /></button></div>
        <form className="modal-form" onSubmit={onSubmit}>
          <div className="form-grid">
            <label className="form-field form-full"><span>Nome completo <b>*</b></span><input autoComplete="name" maxLength={90} onChange={(event) => onChange({ ...draft, name: event.target.value })} placeholder="Nome e sobrenome" required value={draft.name} /></label>
            <label className="form-field"><span>Matrícula <b>*</b></span><input autoComplete="off" maxLength={30} onChange={(event) => onChange({ ...draft, registration: event.target.value })} placeholder="Número de matrícula" required value={draft.registration} /></label>
            <label className="form-field"><span>Nível de acesso</span><select onChange={(event) => onChange({ ...draft, role: event.target.value as AccessLevel })} value={draft.role}><option>Aluno</option><option>Responsável</option></select></label>
            <label className="form-field form-full"><span>E-mail <b>*</b></span><input autoComplete="email" maxLength={100} onChange={(event) => onChange({ ...draft, email: event.target.value })} placeholder="nome@escola.edu.br" required type="email" value={draft.email} /></label>
            <label className="form-field"><span>Telefone <b>*</b></span><input autoComplete="tel" maxLength={25} onChange={(event) => onChange({ ...draft, phone: event.target.value })} placeholder="(00) 00000-0000" required type="tel" value={draft.phone} /></label>
            <label className="form-field"><span>Senha de acesso <b>*</b></span><input autoComplete="new-password" maxLength={60} onChange={(event) => onChange({ ...draft, password: event.target.value })} placeholder="Senha para demonstração" required type="password" value={draft.password} /></label>
          </div>
          <div className="form-security"><Icon name="shield" size={16} /><span>As credenciais ficam salvas neste navegador. Não utilize senhas reais.</span></div>
          {error && <p className="form-error" role="alert">{error}</p>}
          <div className="form-footer"><span><b>*</b> Campos obrigatórios</span><div><button className="button button-outline" onClick={onClose} type="button">Cancelar</button><button className="button button-primary" type="submit">{isEditing ? "Salvar alterações" : "Cadastrar usuário"}</button></div></div>
        </form>
      </section>
    </div>
  );
}
