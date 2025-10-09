import MyFooter from "../components/Footer/MyFooter";

export default function FooterPage() {
  return (
    <div className="footer">
      <h2 style={{ textAlign: "center", margin: "20px 0" }}>Footer Page Example</h2>
      <MyFooter
        author="HoangNV"
        email="hn622017@gmail.com"
        linkGithub="https://github.com/UGEhydra/Fer202"
      />
    </div>
  );
}
