import { Header } from 'social-design-review';

export function LandingPage() {
  return <Header onLogoClick={() => {}} onInstructionsClick={() => {}} showBack={false} />;
}

export function InReview() {
  return <Header onLogoClick={() => {}} onInstructionsClick={() => {}} showBack={true} />;
}
