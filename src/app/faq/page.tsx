export const metadata = {
  title: "FAQ",
  description: "Frequently asked questions about Richie Gadgets.",
};

const faqs = [
  {
    q: "What products do you sell?",
    a: "We offer smartphones, gaming consoles, computers, audio products, wearables, chargers, accessories and creator technology from major brands.",
  },
  {
    q: "How can I place an order?",
    a: "Browse products, add items to your cart, and proceed to checkout. You can also order via WhatsApp from any product page.",
  },
  {
    q: "Do you deliver?",
    a: "This is a demonstration website. In a real store, delivery options would be clearly listed at checkout.",
  },
  {
    q: "How can I contact support?",
    a: "Use the contact form, email, or WhatsApp. Response times would be defined by the live business.",
  },
  {
    q: "Can I order through WhatsApp?",
    a: "Yes. Every product page includes an Order via WhatsApp button that pre-fills the product details.",
  },
  {
    q: "What payment methods are available?",
    a: "This is a demo store. No real payments are processed. A live version would list accepted methods clearly.",
  },
  {
    q: "Do products come with warranty?",
    a: "Demo policy: Manufacturer warranties apply where available. Specific terms would be confirmed on a live site.",
  },
  {
    q: "Can I return an item?",
    a: "Demo policy: Returns would follow a clear returns policy. This demonstration does not process real returns.",
  },
];

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
        Frequently asked questions
      </h1>
      <p className="mt-4 text-muted-foreground">
        Clear answers about shopping with Richie Gadgets. All policies below are demo content.
      </p>

      <div className="mt-12 space-y-8">
        {faqs.map((faq) => (
          <div key={faq.q} className="border-b border-border pb-8">
            <h2 className="text-lg font-medium text-foreground">{faq.q}</h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
