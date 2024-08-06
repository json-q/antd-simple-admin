import { useRef } from "react";
import { useLocation } from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";

interface LayoutAnimationProps {
  children: React.ReactNode;
}
const LayoutAnimation: React.FC<LayoutAnimationProps> = ({ children }) => {
  const { pathname } = useLocation();
  const nodeRef = useRef(null);

  return (
    <SwitchTransition mode="out-in">
      <CSSTransition
        key={pathname}
        nodeRef={nodeRef}
        timeout={300}
        apper
        classNames="fade-side"
        unmountOnExit
      >
        <div ref={nodeRef} className="h-full">
          {children}
        </div>
      </CSSTransition>
    </SwitchTransition>
  );
};

export default LayoutAnimation;
