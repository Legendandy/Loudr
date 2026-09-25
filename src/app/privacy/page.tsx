import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Loudr collects, uses, shares, and protects personal information.",
};

export default function Privacy() {
  return (
    <main id="main" className="container page-main article">
      <h1 className="page-heading">Privacy Policy</h1>
      <div className="prose">
        <p><strong>Effective date: 25 September 2026</strong></p>

        <p>
          This Privacy Policy explains how Loudr (“Loudr,” “we,” “us,” or “our”)
          handles personal information when you visit loudr.me, contact us, or use
          our music-promotion services. Loudr is the controller of the information
          described in this policy. You can contact us through our <a href="/contact">contact page</a>.
        </p>

        <h2>Information we collect</h2>
        <p>We collect information you choose to provide, including:</p>
        <ul>
          <li>your name and email address;</li>
          <li>your artist name, genre, and TikTok sound link;</li>
          <li>the number of campaign posts requested; and</li>
          <li>campaign instructions and other information you include in a message.</li>
        </ul>
        <p>
          If you become a customer, we may also process campaign communications,
          delivery records, transaction records, and the content or account details
          needed to perform the agreed service. Please do not send sensitive personal
          information or information about another person unless it is necessary and
          you are authorised to provide it.
        </p>
        <p>
          Our hosting and security providers may automatically process limited
          technical data, such as your IP address, browser type, device type, request
          time, requested pages, and security logs. We do not currently use advertising
          cookies, sell personal information, or use personal information for targeted
          advertising.
        </p>

        <h2>How and why we use information</h2>
        <p>We use personal information only as reasonably necessary to:</p>
        <ul>
          <li>review and respond to your campaign request;</li>
          <li>prepare, administer, and deliver an agreed campaign;</li>
          <li>communicate with you about the service and provide support;</li>
          <li>protect the website, prevent fraud or abuse, and troubleshoot errors;</li>
          <li>maintain business, tax, and legal records; and</li>
          <li>establish, exercise, or defend legal claims and comply with law.</li>
        </ul>
        <p>
          Depending on the circumstances and applicable law, we rely on steps taken at
          your request before entering a contract, performance of a contract, compliance
          with legal obligations, and our legitimate interests in operating, securing,
          and improving Loudr. Where consent is legally required, we will ask for it,
          and you may withdraw it at any time for future processing.
        </p>

        <h2>When we disclose information</h2>
        <p>
          We disclose personal information only to service providers that help us host
          the site, receive and manage enquiries, communicate with you, process payments
          if a campaign is purchased, secure our systems, or deliver a campaign. They may
          use the information only to provide services to us under appropriate
          confidentiality and data-protection obligations. We may also disclose
          information to professional advisers, a successor in a business transaction,
          or a public authority when reasonably necessary to comply with law, protect
          rights or safety, or handle a legal claim.
        </p>
        <p>
          We do not rent or sell personal information. We do not permit service providers
          to use campaign-enquiry information for their own marketing.
        </p>

        <h2>International transfers</h2>
        <p>
          Our providers may process information in countries other than yours. Where the
          law requires it, we use recognised safeguards for those transfers, such as
          contractual data-protection clauses, or rely on another lawful transfer method.
          You may contact us to ask about the safeguards relevant to your information.
        </p>

        <h2>How long we keep information</h2>
        <ul>
          <li>Unsuccessful form submissions are not stored by the Loudr application.</li>
          <li>
            Campaign enquiries that do not become a paid campaign are deleted or
            anonymised within 12 months after our last substantive contact.
          </li>
          <li>
            Campaign, contract, payment, and tax records are kept for up to seven years
            after the campaign ends, unless a different period is required by law.
          </li>
          <li>
            Security logs are normally kept for no more than 90 days, unless needed to
            investigate abuse, an incident, or a legal claim.
          </li>
        </ul>
        <p>
          We may keep specific information longer when required by law, subject to a
          preservation request, or reasonably necessary for an active dispute. We delete
          or anonymise it when that need ends.
        </p>

        <h2>Security</h2>
        <p>
          We use reasonable administrative, technical, and organisational safeguards
          designed to protect personal information, including access controls, secure
          transmission, input validation, and restrictions on service-provider access.
          No internet service is completely secure, so we cannot guarantee absolute
          security.
        </p>

        <h2>Your rights</h2>
        <p>
          Subject to the law that applies to you, you may ask us to access, correct,
          delete, restrict, or provide a portable copy of your personal information, or
          object to certain processing. You may also withdraw consent where processing
          depends on consent. Loudr does not make decisions about you based solely on
          automated processing that produce legal or similarly significant effects.
        </p>
        <p>
          Submit a request through our <a href="/contact">contact page</a>. We may need
          to verify your identity and authority before acting. We will respond within the
          period required by applicable law. You may also complain to the Nigeria Data
          Protection Commission or the data-protection authority where you live or work.
        </p>

        <h2>Children</h2>
        <p>
          Loudr is intended for people aged 18 or older. We do not knowingly collect
          personal information from children. If you believe a child has provided
          personal information, contact us so we can investigate and delete it where
          required.
        </p>

        <h2>Third-party services</h2>
        <p>
          The site may link to TikTok and other third-party services. Their privacy
          practices are governed by their own policies, and this policy does not cover
          information they collect directly from you.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          We may update this policy when our practices or legal obligations change. We
          will post the revised policy here and change the effective date. If a change
          materially affects how we use information already collected, we will provide
          any additional notice or choice required by law.
        </p>

        <h2>Contact us</h2>
        <p>
          For privacy questions, complaints, or rights requests, use the Loudr
          <a href="/contact"> contact page</a> and state that your message concerns privacy.
        </p>
      </div>
    </main>
  );
}
