"use client";

import { LockKeyhole } from "lucide-react";
import { FormEvent, useState } from "react";

import type { Locale, SiteContent } from "@/lib/types";

export function AdminLogin({ content }: { content: SiteContent }) {
  const [language, setLanguage] = useState<Locale>("en");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus("");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      window.location.reload();
      return;
    }

    setStatus(language === "ar" ? "بيانات الدخول غير صحيحة." : "Invalid credentials.");
    setLoading(false);
  }

  return (
    <div className="admin-shell" dir={language === "ar" ? "rtl" : "ltr"}>
      <div className="login-wrap">
        <section className="login-card">
          <div className="admin-panel-header" style={{ borderBottom: 0, padding: 0 }}>
            <div className="admin-title">
              <h1>{language === "ar" ? content.admin.title.ar : content.admin.title.en}</h1>
              <span>{language === "ar" ? "دخول محمي للوحة المحتوى" : "Protected content dashboard"}</span>
            </div>
            <span className="lang-toggle">
              <button className={language === "en" ? "active" : ""} onClick={() => setLanguage("en")} type="button">
                EN
              </button>
              <button className={language === "ar" ? "active" : ""} onClick={() => setLanguage("ar")} type="button">
                AR
              </button>
            </span>
          </div>

          <form onSubmit={handleSubmit}>
            <label className="form-field">
              <span>{language === "ar" ? "اسم المستخدم" : "Username"}</span>
              <input
                autoComplete="username"
                onChange={(event) => setUsername(event.target.value)}
                required
                type="text"
                value={username}
              />
            </label>
            <label className="form-field">
              <span>{language === "ar" ? "كلمة المرور" : "Password"}</span>
              <input
                autoComplete="current-password"
                onChange={(event) => setPassword(event.target.value)}
                required
                type="password"
                value={password}
              />
            </label>
            {status ? <p className="status-line error">{status}</p> : null}
            <button className="primary-button" disabled={loading} type="submit">
              <LockKeyhole size={18} />
              {loading ? (language === "ar" ? "جاري الدخول..." : "Signing in...") : language === "ar" ? "دخول" : "Sign in"}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
