import React from 'react';

const sectionTitle = 'text-xl font-semibold text-gray-900 mt-8 mb-3';
const subTitle = 'text-lg font-medium text-gray-900 mt-6 mb-2';
const p = 'text-gray-700 leading-relaxed mb-4';
const list = 'list-disc pl-6 space-y-2 text-gray-700 mb-4';
const muted = 'text-sm text-gray-600 mb-4';

export const privacyPolicyContent = (
  <article className="space-y-1">
    <p className={muted}>Last updated: March 23, 2025</p>
    <p className={p}>
      This Privacy Policy describes how Eco Resume (&quot;we,&quot; &quot;us,&quot; or
      &quot;our&quot;) handles information when you use our website and browser-based
      resume and cover letter tools (the &quot;Service&quot;). We designed the Service so
      that your resume and cover letter content stays on your device unless you choose to
      export or share it yourself.
    </p>

    <h2 className={sectionTitle}>1. Who we are</h2>
    <p className={p}>
      Eco Resume operates the Service. For privacy-related requests, use the contact
      options on our{' '}
      <a href="/contact" className="text-blue-600 hover:underline">
        Contact
      </a>{' '}
      page.
    </p>

    <h2 className={sectionTitle}>2. Information we process</h2>

    <h3 className={subTitle}>2.1 Resume and cover letter content (local only)</h3>
    <p className={p}>
      When you use the builders, your drafts are stored in your browser using{' '}
      <strong>session storage</strong> so you can refresh the page or move between steps
      without losing work. We do <strong>not</strong> receive, store, or access that
      content on our servers as part of the current Service. Clearing your browser data or
      closing the session may remove drafts.
    </p>

    <h3 className={subTitle}>2.2 Technical and usage data</h3>
    <p className={p}>
      Like most websites, infrastructure providers may automatically process technical
      information when you connect to the Service, such as IP address, browser type,
      device type, and the date and time of requests. This helps deliver the site
      securely and reliably.
    </p>

    <h3 className={subTitle}>2.3 Analytics (optional)</h3>
    <p className={p}>
      If you choose <strong>Accept analytics</strong> in our cookie banner, we enable{' '}
      <strong>Vercel Analytics</strong> to collect privacy-focused, aggregated usage
      statistics (for example, page views). You can change your choice anytime via{' '}
      <strong>Cookie settings</strong> in the footer. If you choose{' '}
      <strong>Essential only</strong>, we do not load Vercel Analytics.
    </p>

    <h3 className={subTitle}>2.4 Cookie and consent preferences</h3>
    <p className={p}>
      We store your analytics preference in <strong>local storage</strong> on your device
      so we know whether to load analytics on future visits. See our{' '}
      <a href="/cookies" className="text-blue-600 hover:underline">
        Cookie Policy
      </a>{' '}
      for details.
    </p>

    <h3 className={subTitle}>2.5 Contact or other submissions</h3>
    <p className={p}>
      If you email us or use a contact method we provide, we process the information you
      send (such as your name, email address, and message) to respond to you.
    </p>

    <h2 className={sectionTitle}>3. How we use information</h2>
    <ul className={list}>
      <li>Operate, maintain, and secure the Service</li>
      <li>Understand aggregated usage if you opt in to analytics</li>
      <li>Respond to your inquiries</li>
      <li>Comply with law and enforce our Terms</li>
    </ul>

    <h2 className={sectionTitle}>4. Legal bases (EEA, UK, and similar)</h2>
    <p className={p}>
      Where the GDPR or UK GDPR applies, we rely on <strong>consent</strong> for Vercel
      Analytics and similar optional technologies when required; on{' '}
      <strong>contractual necessity</strong> or <strong>legitimate interests</strong>{' '}
      (such as security, fraud prevention, and service operation) for essential
      processing; and on other bases as permitted by law.
    </p>

    <h2 className={sectionTitle}>5. Sharing and subprocessors</h2>
    <p className={p}>
      We use trusted service providers to host and operate the Service. For example, the
      site may be hosted on <strong>Vercel</strong>, which processes technical data in
      connection with delivery of the application. If you opt in, <strong>Vercel</strong>{' '}
      also provides analytics as described above. Their processing is governed by their
      privacy documentation.
    </p>
    <p className={p}>
      We do not sell your personal information for money. If we use advertising or
      similar partners in the future, we will update this policy and, where required,
      obtain consent before loading those technologies.
    </p>

    <h2 className={sectionTitle}>6. International transfers</h2>
    <p className={p}>
      Our hosting and analytics providers may process data in the United States and other
      countries. Where required, we use appropriate safeguards (such as standard
      contractual clauses) or rely on exceptions permitted by law.
    </p>

    <h2 className={sectionTitle}>7. Retention</h2>
    <p className={p}>
      Draft content remains in your browser session until you clear it or end the
      session. Server-side logs retained by infrastructure providers are governed by their
      retention practices. Analytics data is handled according to Vercel&apos;s policies.
      Correspondence with us is kept only as long as needed to assist you and meet legal
      obligations.
    </p>

    <h2 className={sectionTitle}>8. Your rights</h2>
    <p className={p}>
      Depending on where you live, you may have rights to access, correct, delete, or
      restrict processing of personal data, to data portability, to withdraw consent, and
      to object to certain processing. You may also have the right to lodge a complaint
      with a supervisory authority. To exercise rights, contact us via the{' '}
      <a href="/contact" className="text-blue-600 hover:underline">
        Contact
      </a>{' '}
      page. You can disable analytics at any time using <strong>Cookie settings</strong>.
    </p>

    <h2 className={sectionTitle}>9. United States state privacy notices</h2>
    <p className={p}>
      Residents of certain U.S. states may have additional rights regarding personal
      information, including opt-out rights related to targeted advertising or
      &quot;sale&quot; or &quot;sharing&quot; as defined by local law. Where applicable,
      use <strong>Cookie settings</strong> to limit optional analytics, or contact us to
      exercise other rights.
    </p>

    <h2 className={sectionTitle}>10. Children</h2>
    <p className={p}>
      The Service is not directed to children under 16, and we do not knowingly collect
      personal information from children. If you believe we have collected information
      from a child, please contact us.
    </p>

    <h2 className={sectionTitle}>11. Changes</h2>
    <p className={p}>
      We may update this Privacy Policy from time to time. We will post the updated
      version on this page and revise the &quot;Last updated&quot; date.
    </p>
  </article>
);

export const termsOfServiceContent = (
  <article className="space-y-1">
    <p className={muted}>Last updated: March 23, 2025</p>
    <p className={p}>
      These Terms of Service (&quot;Terms&quot;) govern your access to and use of Eco
      Resume&apos;s website and tools (the &quot;Service&quot;). By using the Service,
      you agree to these Terms. If you do not agree, do not use the Service.
    </p>

    <h2 className={sectionTitle}>1. The Service</h2>
    <p className={p}>
      Eco Resume provides browser-based templates and editing tools to help you create
      resumes and cover letters. The Service is provided for informational and personal
      career use unless we agree otherwise in writing.
    </p>

    <h2 className={sectionTitle}>2. Your content</h2>
    <p className={p}>
      You retain ownership of the information you enter. Current versions of the Service
      process drafts locally in your browser; you are responsible for accuracy,
      legality, and how you share or submit documents to employers or others. You must
      not enter unlawful, infringing, or harmful content.
    </p>

    <h2 className={sectionTitle}>3. License to use the Service</h2>
    <p className={p}>
      Subject to these Terms, we grant you a limited, non-exclusive, non-transferable,
      revocable license to access and use the Service for personal, non-commercial
      purposes.
    </p>
    <p className={p}>
      Unless we agree otherwise in writing, you may not use the Service as part of a
      paid offering to others—for example, charging clients to create, edit, or format
      their resumes or cover letters using our templates or tools, or running a
      resume-writing or career-services business where the Service is how you produce
      those deliverables. Informal help for friends or family without payment is fine.
      If you want to use Eco Resume commercially (agencies, freelancers, schools,
      employers, etc.), contact us through the{' '}
      <a href="/contact" className="text-blue-600 hover:underline">
        Contact
      </a>{' '}
      page to discuss a separate license.
    </p>

    <h2 className={sectionTitle}>4. Intellectual property</h2>
    <p className={p}>
      The Service, including layouts, designs, branding, and software (excluding your
      content), is owned by Eco Resume or its licensors and is protected by intellectual
      property laws. You may not copy, modify, distribute, sell, or reverse engineer the
      Service except as allowed by law or with our written permission.
    </p>

    <h2 className={sectionTitle}>5. Acceptable use</h2>
    <p className={p}>You agree not to:</p>
    <ul className={list}>
      <li>Use the Service in violation of law or third-party rights</li>
      <li>Attempt to disrupt, overload, or compromise the Service or its security</li>
      <li>Use automated means to scrape or access the Service in a way that harms us or
        other users</li>
      <li>Misrepresent your identity or affiliation</li>
      <li>
        Provide paid resume, cover letter, or similar document services to third parties
        using the Service without our prior written commercial agreement
      </li>
    </ul>

    <h2 className={sectionTitle}>6. Disclaimers</h2>
    <p className={p}>
      THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE.&quot; TO THE
      MAXIMUM EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, WHETHER EXPRESS,
      IMPLIED, OR STATUTORY, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
      AND NON-INFRINGEMENT. WE DO NOT GUARANTEE EMPLOYMENT OUTCOMES OR THAT DOCUMENTS
      WILL MEET SPECIFIC EMPLOYER OR ATS REQUIREMENTS.
    </p>

    <h2 className={sectionTitle}>7. Limitation of liability</h2>
    <p className={p}>
      TO THE MAXIMUM EXTENT PERMITTED BY LAW, ECO RESUME AND ITS SUPPLIERS WILL NOT BE
      LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES,
      OR ANY LOSS OF PROFITS, DATA, OR GOODWILL, ARISING FROM YOUR USE OF THE SERVICE.
      OUR TOTAL LIABILITY FOR ANY CLAIM ARISING OUT OF OR RELATING TO THE SERVICE IS
      LIMITED TO THE GREATER OF (A) THE AMOUNT YOU PAID US FOR THE SERVICE IN THE TWELVE
      MONTHS BEFORE THE CLAIM OR (B) FIFTY U.S. DOLLARS (US$50), IF YOU HAVE NOT PAID US.
    </p>

    <h2 className={sectionTitle}>8. Indemnity</h2>
    <p className={p}>
      You will defend and indemnify Eco Resume against claims, damages, losses, and
      expenses (including reasonable attorneys&apos; fees) arising from your content, your
      use of the Service, or your violation of these Terms, to the extent permitted by
      law.
    </p>

    <h2 className={sectionTitle}>9. Changes and termination</h2>
    <p className={p}>
      We may modify the Service or these Terms at any time. We will post updated Terms
      on this page. Continued use after changes constitutes acceptance. We may suspend or
      terminate access if you violate these Terms or if we discontinue the Service.
    </p>

    <h2 className={sectionTitle}>10. Governing law</h2>
    <p className={p}>
      These Terms are governed by the laws of the United States and the State in which
      the operator of Eco Resume maintains its principal place of business, without
      regard to conflict-of-law principles, except where mandatory consumer protection
      laws of your jurisdiction require otherwise.
    </p>

    <h2 className={sectionTitle}>11. Contact</h2>
    <p className={p}>
      Questions about these Terms? Reach us through the{' '}
      <a href="/contact" className="text-blue-600 hover:underline">
        Contact
      </a>{' '}
      page.
    </p>
  </article>
);

export const cookiePolicyContent = (
  <article className="space-y-1">
    <p className={muted}>Last updated: March 23, 2025</p>
    <p className={p}>
      This Cookie Policy explains how Eco Resume (&quot;we&quot;) uses browser storage
      and similar technologies when you use our website (the &quot;Service&quot;).
    </p>

    <h2 className={sectionTitle}>1. Technologies we use</h2>
    <p className={p}>
      In addition to traditional HTTP cookies, browsers offer <strong>session storage</strong>,{' '}
      <strong>local storage</strong>, and similar mechanisms. We use these where needed
      for the Service to function or to remember your choices.
    </p>

    <h2 className={sectionTitle}>2. Essential use (always on)</h2>
    <ul className={list}>
      <li>
        <strong>Session storage (drafts):</strong> We store your resume and cover letter
        drafts in <code className="text-sm bg-gray-100 px-1 rounded">sessionStorage</code>{' '}
        while you work. This is necessary for the builders to work across steps and
        refreshes in your current browser session.
      </li>
      <li>
        <strong>Consent preference:</strong> We record whether you chose Essential only
        or Accept analytics in <code className="text-sm bg-gray-100 px-1 rounded">localStorage</code>{' '}
        under the key <code className="text-sm bg-gray-100 px-1 rounded">eco_resume_cookie_consent</code>
        . This is necessary to respect your choice on return visits.
      </li>
    </ul>

    <h2 className={sectionTitle}>3. Analytics (optional)</h2>
    <p className={p}>
      If you click <strong>Accept analytics</strong>, we load <strong>Vercel Analytics</strong>{' '}
      to collect aggregated, privacy-oriented usage metrics. Vercel&apos;s documentation
      describes what they collect and how they process it. If you choose{' '}
      <strong>Essential only</strong>, we do not load this script.
    </p>

    <h2 className={sectionTitle}>4. Managing your choices</h2>
    <p className={p}>
      You can open <strong>Cookie settings</strong> from the site footer to change your
      analytics preference. You can also clear site data in your browser settings; that
      may remove drafts and reset your consent banner.
    </p>

    <h2 className={sectionTitle}>5. Future advertising</h2>
    <p className={p}>
      If we introduce advertising or additional third-party technologies, we will update
      this policy and, where required, ask for consent before enabling them.
    </p>

    <h2 className={sectionTitle}>6. More information</h2>
    <p className={p}>
      For how we handle personal data more broadly, see our{' '}
      <a href="/privacy" className="text-blue-600 hover:underline">
        Privacy Policy
      </a>
      .
    </p>
  </article>
);
