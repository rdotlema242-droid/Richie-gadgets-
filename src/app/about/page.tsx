export const metadata = {
  title: "About",
  description: "Technology, without the noise. Learn about Richie Gadgets.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
        Technology, without the noise.
      </h1>
      <div className="mt-8 space-y-6 text-muted-foreground leading-relaxed">
        <p>
          Richie Gadgets is a modern electronics retailer focused on carefully
          selected technology. We believe shopping for phones, gaming systems,
          computers and everyday gadgets should feel clear, calm and trustworthy.
        </p>
        <p>
          Our approach is simple: curate products that matter, present them
          honestly, and make the buying experience straightforward. No clutter.
          No gimmicks. Just technology worth your attention.
        </p>
        <p>
          This website is a portfolio demonstration. It shows how a premium
          technology retailer can look and feel online — with thoughtful design,
          accurate product information, and a complete shopping experience.
        </p>
      </div>
    </div>
  );
}
