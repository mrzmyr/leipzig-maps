import Switch from "rc-switch";
import { useState } from "react";
import { Spinner } from "react-bootstrap";

const SwitchLine = ({
  checked,
  onChange,
  loading,
  icon,
  label
}) => {
  const spinner = <Spinner animation="border" size="sm" />;
  const [isActive, setIsActive] = useState(false);
  
  return (
    <div
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onTouchStart={() => setIsActive(true)}
      onTouchEnd={() => setIsActive(false)}
      onTouchCancel={() => setIsActive(false)}
      onClick={() => onChange()}
      style={{ 
        display: 'flex', 
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontSize: '1.1rem',
        padding: '10px 20px',
        backgroundColor: isActive ? '#eee' : '#fff'
      }}
    >
      <div>
        <span style={{ marginRight: 7 }}>{loading ? spinner : icon}</span>
        <span>{label}</span>
      </div>
      <div>
        <Switch
          disabled={loading === true}
          checked={checked}
        />
      </div>
    </div>
  )
}

export default SwitchLine;
