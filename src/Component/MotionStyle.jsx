import { motion as Motion } from "framer-motion";

const MotionStyle = ({ children }) => {
  return (
    <Motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.3 }}
      className="mb-6"
    >
      {children}
    </Motion.div>
  );
};
export default MotionStyle;