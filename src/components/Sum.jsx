function Sum({
  title,
  what,
  inputNum,
  changeNum,
  defNum,
  maxNum,
  minNum,
  rangeVal,
  changeRange,
  colorLine,
  maxRange,
  minRange,
  disBtn,
}) {
  return (
    <button disabled={disBtn} className="sum">
      <p className="sum__title">{title}</p>
      <div className="sum__wrapper">
        <input
          type="number"
          value={inputNum}
          onChange={changeNum}
          defaultValue={defNum}
          max={maxNum}
          min={minNum}
          className="sum__input"
        />
        <span>{what}</span>
        <div className="sum__slide-wrapper">
          <input
            type="range"
            max={maxRange || maxNum}
            min={minRange || minNum}
            value={rangeVal}
            step="1"
            onChange={changeRange}
            style={colorLine}
            className="sum__slider"
          ></input>
        </div>
      </div>
    </button>
  );
}

export default Sum;
