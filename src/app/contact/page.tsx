export const metadata = {
  title: "Contact",
  description: "Get in touch with Richie Gadgets.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
        Contact
      </h1>
      <p className="mt-4 text-muted-foreground">
        This is a demonstration website. Contact details below are placeholders.
      </p>

      <div className="mt-12 grid sm:grid-cols-2 gap-8">
        <div>
          <h2 className="text-sm font-medium text-foreground uppercase tracking-wide">Email</h2>
          <p className="mt-2 text-muted-foreground">hello@richiegadgets.demo</p>
        </div>
        <div>
          <h2 className="text-sm font-medium text-foreground uppercase tracking-wide">Phone</h2>
          <p className="mt-2 text-muted-foreground">+1 (555) 000-0000</p>
        </div>
        <div>
          <h2 className="text-sm font-medium text-foreground uppercase tracking-wide">WhatsApp</h2>
          <p className="mt-2 text-muted-foreground">Available via product pages</p>
        </div>
        <div>
          <h2 className="text-sm font-medium text-foreground uppercase tracking-wide">Hours</h2>
          <p className="mt-2 text-muted-foreground">Mon–Fri 9:00–18:00 (demo)</p>
        </div>
      </div>

      <div className="mt-12 p-6 rounded-2xl border border-border bg-card">
        <h2 className="text-lg font-medium text-foreground">Location</h2>
        <p className="mt-2 text-muted-foreground text-sm">
          Demo location — replace with business address
        </p>
      </div>

      <form className="mt-12 space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
            Name
          </label>
          <input
            id="name"
            type="text"
            className="w-full h-12 px-4 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full h-12 px-4 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
            Message
          </label>
          <textarea
            id="message"
            rows={5}
            className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
            placeholder="How can we help?"
          />
        </div>
        <button
          type="button"
          className="h-12 px-8 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors"
        >
          Send message (demo)
        </button>
      </form>
    </div>
  );
}
