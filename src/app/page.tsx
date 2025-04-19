import MainSlider from "@/components/main/main.slider";
import { Container } from "@mui/material";

export default function HomePage() {
  return (
    <div>
      <Container>
        <MainSlider />
        <MainSlider />
        <MainSlider />
      </Container>
    </div>
  );
}
