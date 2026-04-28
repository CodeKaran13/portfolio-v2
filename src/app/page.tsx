import Hero from '@/components/Hero';
import Work from '@/components/Work';
import Systems from '@/components/Systems';
import Experience from '@/components/Experience';
import Writing from '@/components/Writing';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import FadeIn from '@/components/FadeIn';
import Divider from '@/components/Divider';

export default function Home() {
  return (
    <div style={{ minHeight: '100vh' }}>
      <main>
        <FadeIn><Hero /></FadeIn>
        <Divider />
        <FadeIn delay={80}><Work /></FadeIn>
        <Divider />
        <FadeIn delay={80}><Systems /></FadeIn>
        <Divider />
        <FadeIn delay={80}><Experience /></FadeIn>
        <Divider />
        <FadeIn delay={80}><Writing /></FadeIn>
        <Divider />
        <FadeIn delay={80}><Contact /></FadeIn>
      </main>
      <Footer />
    </div>
  );
}
