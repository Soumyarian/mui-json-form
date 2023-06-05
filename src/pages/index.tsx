import { JSONForm } from "@/components";
import { formData } from "@/components/data/product-json-form";
import { Container } from "@mui/material";

export default function Home() {
  return (
    <Container sx={{ py: 3 }} maxWidth="md">
      <JSONForm data={formData} onSubmit={() => {}} />
    </Container>
  );
}
