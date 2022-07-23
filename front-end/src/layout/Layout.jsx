import Header from "./components/header/Header"
import Menu from "./components/menu/Menu"

const Layout = ({children}) => {
  return (
    <div className="max-w-screen min-h-screen bg-primary flex flex-col overflow-hidden relative">
        <Menu/>
        <Header/>
    </div>
  )
}

export default Layout