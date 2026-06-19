import { useState } from "react";
import useScrollAnimation from "../hooks/useScrollAnimation";
import SectionHeading from "../components/SectionHeading";
import SectionNext from "../components/SectionNext";

// Web3Forms access key.
// Vercel 환경변수 VITE_WEB3FORMS_KEY 로 넣거나, 아래 문자열을 발급받은 키로 교체.
// 키 발급(무료): https://web3forms.com → 이메일 입력 → access key 수신 (asd25999@gmail.com 로 메일 도착)
const ACCESS_KEY =
  import.meta.env.VITE_WEB3FORMS_KEY || "99f81fe5-9849-472d-acef-ff4078b3fd69";

const contacts = [
  { kind: "mail", color: "#2de2e6", label: "asd25999@gmail.com", href: "mailto:asd25999@gmail.com" },
  { kind: "phone", color: "#58ff8c", label: "010-9636-2599", href: "tel:01096362599" },
  { kind: "github", color: "#a9b0ff", label: "GitHub · asd2599", href: "https://github.com/asd2599" },
  { kind: "proj-eggtalk", color: "#a78bfa", label: "EggTalk · gamestack.store", href: "https://gamestack.store" },
  { kind: "proj-flowfit", color: "#6ea8ff", label: "FlowFit · flowfit.cloud", href: "https://flowfit.cloud" },
  { kind: "proj-kiwofarm", color: "#58ff8c", label: "KiwoFarm · kiwofarm.store", href: "https://kiwofarm.store" },
];

// 사이트 톤(네온 라인)에 맞춘 연락처 아이콘
function ContactIcon({ kind }) {
  if (kind.startsWith("proj-")) {
    return (
      <svg className="ct-svg" aria-hidden="true">
        <use href={`/project-icons.svg#${kind}`} />
      </svg>
    );
  }
  if (kind === "github") {
    return (
      <svg className="ct-svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.18.58.69.48A10 10 0 0 0 22 12c0-5.52-4.48-10-10-10z" />
      </svg>
    );
  }
  const shape = {
    mail: (
      <>
        <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
        <path d="M3 6.5l9 6.5 9-6.5" />
      </>
    ),
    phone: <path d="M6.5 3.5h3l1.4 4-2 1.3a12 12 0 0 0 5.3 5.3l1.3-2 4 1.4v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.7 2 2 0 0 1 6.5 3.5z" />,
  };
  return (
    <svg className="ct-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {shape[kind]}
    </svg>
  );
}

export default function Contact() {
  const formRef = useScrollAnimation(0);
  const listRef = useScrollAnimation(150);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = Object.fromEntries(new FormData(form));
    if (data.botcheck) return; // 허니팟(봇 차단)

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: "[hbkim.cloud] 포트폴리오 문의",
          from_name: data.name,
          name: data.name,
          email: data.email,
          replyto: data.email,
          message: data.message,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" style={styles.section}>
      <SectionHeading
        eyebrow="Contact"
        title="연락처"
        subtitle="아래 폼으로 메시지를 남겨주시면 바로 메일로 전달됩니다. 보통 빠르게 답장드립니다."
        center
      />

      <div style={styles.grid}>
        {/* 좌측: 메일 폼 */}
        <form ref={formRef} style={styles.form} onSubmit={handleSubmit}>
          <input
            type="checkbox"
            name="botcheck"
            style={{ display: "none" }}
            tabIndex="-1"
            autoComplete="off"
          />

          <div style={styles.row}>
            <div className="form-field">
              <label className="form-label" htmlFor="cf-name">
                이름
              </label>
              <input
                className="form-input"
                id="cf-name"
                name="name"
                type="text"
                required
                placeholder="홍길동"
              />
            </div>
            <div className="form-field">
              <label className="form-label" htmlFor="cf-email">
                메일
              </label>
              <input
                className="form-input"
                id="cf-email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="cf-msg">
              내용
            </label>
            <textarea
              className="form-textarea"
              id="cf-msg"
              name="message"
              required
              placeholder="제안이나 문의 내용을 남겨주세요."
            />
          </div>

          <div style={styles.submitRow}>
            <button
              type="submit"
              className="btn-arcade"
              disabled={status === "sending"}
              style={
                status === "sending"
                  ? { opacity: 0.7, cursor: "wait" }
                  : undefined
              }
            >
              {status === "sending" ? "전송 중…" : "메일 보내기 ▸"}
            </button>
            {status === "success" && (
              <span className="form-status ok">
                ✓ 전송됐습니다. 감사합니다!
              </span>
            )}
            {status === "error" && (
              <span className="form-status err">
                전송에 실패했습니다. 잠시 후 다시 시도하거나 메일로 연락 주세요.
              </span>
            )}
          </div>
        </form>

        {/* 우측: 연락처 정보 */}
        <div ref={listRef} style={styles.list}>
          {contacts.map((c) => (
            <a
              key={c.href}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={
                c.href.startsWith("http") ? "noopener noreferrer" : undefined
              }
              className="contact-item"
              style={{ "--c": c.color }}
            >
              <span className="ct-icon"><ContactIcon kind={c.kind} /></span>
              <span className="ct-label">{c.label}</span>
              <span className="ct-arrow arcade" aria-hidden="true">▸</span>
            </a>
          ))}
        </div>
      </div>

      <SectionNext up />
    </section>
  );
}

const styles = {
  section: { padding: "6rem 2rem 8rem", maxWidth: "960px", margin: "0 auto" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "2rem",
    alignItems: "start",
  },
  form: { display: "flex", flexDirection: "column", gap: "1rem" },
  row: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
    gap: "1rem",
  },
  submitRow: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    flexWrap: "wrap",
    marginTop: "0.25rem",
  },
  list: { display: "flex", flexDirection: "column", gap: "0.7rem" },
};
