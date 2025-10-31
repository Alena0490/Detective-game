import "./Winscreen.css";

type Props = { children?: React.ReactNode };

function WinScreen({ children }: Props) {
  return <section>
            {children}
            
        </section>;
}

export default WinScreen;

