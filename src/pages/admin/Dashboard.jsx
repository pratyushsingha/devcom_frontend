import Container from "@/components/Container";
import AdminSidebar from "@/components/admin/AdminSidebar";

const Dashboard = () => {
  return (
    <Container className="flex space-x-5">
      <AdminSidebar />
      <p>welcome to admin dashboard 🚀</p>
    </Container>
  );
};

export default Dashboard;
