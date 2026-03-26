import React, { useState } from "react";
import "../styles/contact.css";
import { SUBJECTS, PLACEHOLDERS } from "../constants/contactData";

const INITIAL_FORM_STATE = { name: "", email: "", subject: "", message: "" };
const INITIAL_STATUS = { loading: false, error: "", success: false };

const Contact = () => {
  // status ← يحفظ حالة الإرسال (تحميل / خطأ / نجاح)
  const [form, setForm] = useState(INITIAL_FORM_STATE);
  const [status, setStatus] = useState(INITIAL_STATUS);

  // يُستدعى عند الكتابة في أي حقل
  // { target: { name, value } } ← نأخذ اسم الحقل وقيمته مباشرة من الحدث
  const handleChange = ({ target: { name, value } }) => {
    // لو كان هناك خطأ أو نجاح سابق → نمسحه فور ما يبدأ المستخدم بالكتابة
    if (status.error || status.success) setStatus(INITIAL_STATUS);

    // نحدّث الحقل الذي تغيّر فقط، ونبقي باقي الحقول كما هي
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // نمنع إعادة تحميل الصفحة

    // Object.values → نأخذ قيم الحقول كمصفوفة
    // .some(v => !v) → نتحقق إذا كان أي حقل فارغاً
    if (Object.values(form).some((value) => !value)) {
      setStatus({
        ...INITIAL_STATUS,
        error: "Bitte füllen Sie alle Felder aus.",
      });
      return; // نوقف التنفيذ ولا نرسل
    }

    try {
      // نضع loading: true حتى يظهر "جاري الإرسال..." ويتعطّل الزر
      setStatus({ ...INITIAL_STATUS, loading: true });

      // نقرأ رابط الـ API من متغيرات البيئة، وإذا لم يوجد نستخدم localhost
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

      // نرسل البيانات إلى السيرفر بصيغة JSON
      const res = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form), // نحوّل الكائن إلى نص JSON
      });

      // إذا كان رد السيرفر غير ناجح (مثلاً 400 أو 500)
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Etwas ist schiefgelaufen."); // نرمي الخطأ لـ catch
      }

      // الإرسال نجح → نفرّغ النموذج ونُظهر رسالة النجاح
      setStatus({ ...INITIAL_STATUS, success: true });
      setForm(INITIAL_FORM_STATE);
    } catch (err) {
      // أي خطأ (شبكة أو سيرفر) → نُظهر نص الخطأ للمستخدم
      setStatus({ ...INITIAL_STATUS, error: err.message });
    }
  };

  return (
    <div className="contact-page">
      <h1>Kontakt</h1>
      <div className="contact-container">
        <div className="contact-form-section">
          <h2>Schreiben Sie uns</h2>

          <form onSubmit={handleSubmit} className="contact-form">
            {/* بدل تكرار label+input مرتين، نضعهما في مصفوفة ونرسمهما بـ map */}
            {[
              {
                id: "name",
                label: "Name",
                type: "text",
                placeholder: "Ihr Name",
              },
              {
                id: "email",
                label: "E-Mail",
                type: "email",
                placeholder: "ihre@email.de",
              },
            ].map((field) => (
              <React.Fragment key={field.id}>
                <label htmlFor={field.id}>{field.label}</label>
                <input
                  id={field.id}
                  name={field.id}
                  type={field.type}
                  value={form[field.id]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  required
                />
              </React.Fragment>
            ))}

            {/* قائمة الموضوعات — نضيف كلاس "selected" عند الاختيار للتنسيق */}
            <label htmlFor="subject">Betreff</label>
            <select
              id="subject"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              className={form.subject ? "selected" : ""}
            >
              <option value="" disabled>
                Bitte wählen...
              </option>
              {SUBJECTS.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>

            {/* placeholder يتغيّر حسب الموضوع المختار */}
            <label htmlFor="message">Nachricht</label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder={PLACEHOLDERS[form.subject] || "Ihre Nachricht..."}
              rows={5}
            />

            {/* نُظهر رسالة الخطأ فقط إذا كان status.error غير فارغ */}
            {status.error && <p className="error-msg">{status.error}</p>}

            {/* نُظهر رسالة النجاح فقط إذا كان status.success يساوي true */}
            {status.success && (
              <p className="success-msg">
                ✅ Vielen Dank! Ihre Nachricht wurde gesendet.
              </p>
            )}

            {/* الزر معطّل أثناء الإرسال لمنع النقر مرتين */}
            <button type="submit" disabled={status.loading}>
              {status.loading ? "Wird gesendet..." : "Nachricht senden"}
            </button>
          </form>
        </div>

        {/* قسم المعلومات ثابت لا يحتاج state */}
        <div className="contact-info-section">
          <div className="contact-info">
            <h2>Unsere Kontaktdaten</h2>
            <p>📍 Kettwiger Str. 10, 45127 Essen</p>
            <p>📞 +49 91742239</p>
            <p>✉️ info@cleanservice-essen.de</p>
            <p>🕐 Mo–Fr: 08:00 – 15:00 Uhr</p>
          </div>
          <div className="contact-map">
            <iframe
              title="Standort Essen"
              src="https://maps.google.com/maps?q=Kettwiger%20Str.%2010,%20Essen&t=&z=13&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
