const ColorScale = ({
  min,
  max,
  scale,
}) => {
  const databasisColorScale = scale.domain([0, 100]);
  
  const _100 = [];
  for (let i = 0; i < 100; i++) _100.push(i)
  
  return (
    <div style={{ overflow: 'auto', fontFamily: 'monospace' }}>
      {_100.map(i => 
        <span key={i} style={{ 
          display: 'inline-block', 
          backgroundColor: databasisColorScale(i).hex(), 
          width: '1%', height: 10 
        }}>
      </span>)}
      <div style={{ float: 'left' }}>{min}</div>
      <div style={{ float: 'right' }}>{max}</div>
    </div>
  )
}

export default ColorScale;
