import { Box, Card } from "@mui/material";

const ViewDetailsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box sx={{ maxWidth: 1024, width: "100%" }}>
        <Card variant="outlined">{children}</Card>
      </Box>
    </Box>
  );
};

export default ViewDetailsLayout;
