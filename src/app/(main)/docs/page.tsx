// app/docs/email-setup/page.tsx

import Image from "next/image";

export default function EmailSetupDocs() {
  return (
    <div className="max-w-4xl py-10 px-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-6 ">
        📧 Connect Your Gmail to Send Emails
      </h1>
      <p className="mb-8 text-lg text-gray-600">
        To send emails on your behalf, we need your Gmail App Password. Follow
        these simple steps:
      </p>

      <hr className="text-gray-300 my-4" />

      {/* <hr /> */}

      <ol className="list-decimal space-y-8 text-base leading-7 pl-5">
        <li id="step-1">
          <p>
            Visit{" "}
            <a
              href="https://myaccount.google.com/security"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline font-medium"
            >
              Google Account Security
            </a>
          </p>
          <Image
            src="/docs/doc-im-1.webp"
            alt="Google Security Page"
            width={800}
            height={400}
            className="rounded-lg shadow-md mt-4"
          />
        </li>

        <hr className="text-gray-300" />

        <li id="step-2">
          <p>
            Enable <strong>2-Step Verification</strong> if it's not already
            enabled.
          </p>
          <Image
            src="/docs/doc-im-2.webp"
            alt="Enable 2FA"
            width={800}
            height={400}
            className="rounded-lg shadow-md mt-4"
          />
        </li>

        <hr className="text-gray-300" />

        <li id="step-3">
          <p>
            Scroll down or go inside <b>2 Step Verification</b> section and
            click on <strong>App passwords</strong>.
          </p>
          <Image
            src="/docs/doc-im-3.webp"
            alt="App Password Option"
            width={800}
            height={400}
            className="rounded-lg shadow-md mt-4"
          />
        </li>

        <hr className="text-gray-300" />

        <li id="step-4">
          <p>
            Choose <strong>Mail</strong> as the app, and{" "}
            <strong>Other (Custom name)</strong> for the device. Name it
            anything you like.
          </p>
          <Image
            src="/docs/doc-im-4.webp"
            alt="Select App and Device"
            width={800}
            height={400}
            className="rounded-lg shadow-md mt-4"
          />
        </li>

        <hr className="text-gray-300" />

        <li id="step-5">
          <p>
            Click <strong>Create</strong> to get your 16-character app password.
          </p>
          <Image
            src="/docs/doc-im-5.webp"
            alt="Generate App Password"
            width={800}
            height={400}
            className="rounded-lg shadow-md mt-4"
          />
        </li>

        <hr className="text-gray-300" />

        <li id="step-6">
          <p>
            Copy the password and paste it into the form below or in your
            settings. It will look something like:{" "}
            <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
              dlqe vkpt broq mycv
            </code>
          </p>
        </li>
      </ol>

      <div className="mt-12 bg-gray-50 border border-gray-200 rounded-xl p-6" id="why-needed">
        <h2 className="text-xl font-semibold mb-2">🔐 Why Do We Need This?</h2>
        <p className="text-gray-700">
          Gmail doesn’t allow sign-in from less secure apps. By generating an
          App Password, you’re allowing this app to send emails on your behalf,
          safely and securely.
        </p>
      </div>
    </div>
  );
}
