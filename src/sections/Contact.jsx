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
  {
    icon: "✉️",
    label: "asd25999@gmail.com",
    href: "mailto:asd25999@gmail.com",
  },
  { icon: "📞", label: "010-9636-2599", href: "tel:01096362599" },
  {
    icon: "🥚",
    label: "EggTalk · gamestack.store",
    href: "https://gamestack.store",
  },
  {
    icon: "🏢",
    label: "FlowFit · flowfit.cloud",
    href: "https://flowfit.cloud",
  },
  {
    icon: "🌱",
    label: "KiwoFarm · kiwofarm.store",
    href: "https://kiwofarm.store",
  },
  { icon: "💻", label: "GitHub · asd2599", href: "https://github.com/asd2599" },
];

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
              className="btn-primary"
              disabled={status === "sending"}
              style={
                status === "sending"
                  ? { opacity: 0.7, cursor: "wait" }
                  : undefined
              }
            >
              {status === "sending" ? "보내는 중…" : "메일 보내기"}
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
            >
              <span style={styles.icon}>{c.icon}</span>
              <span>{c.label}</span>
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
  list: { display: "flex", flexDirection: "column", gap: "0.85rem" },
  icon: { fontSize: "1.2rem", minWidth: "24px" },
};
