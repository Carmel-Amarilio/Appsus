import { eventBusService } from "../services/event-bus.service.js";
const { useState, useEffect, useRef } = React;

export function UserMsg() {
  const [msg, setMsg] = useState(null);
  const timeoutIdRef = useRef();

  useEffect(() => {
    const unsubscribe = eventBusService.on("show-user-msg", (msg) => {
      console.log("Got msg", msg);
      setMsg(msg);
      if (timeoutIdRef.current) {
        timeoutIdRef.current = null;
        clearTimeout(timeoutIdRef.current);
      }
      timeoutIdRef.current = setTimeout(closeMsg, 3000);
    });
    return unsubscribe;
  }, []);

  function closeMsg() {
    setMsg(null);
  }

  if (!msg) return <span></span>;
  return (
    <section
      className={`user-msg ${msg.type} flex justify-center align-center`}
    >
      <button className={"list-button"} onClick={closeMsg}>
        <img src="assets/icons/close_FILL0_wght400_GRAD0_opsz24.png" alt="" />
      </button>
      {msg.txt}
    </section>
  );
}
