//suggestions is an array of objects
import React from 'react';

const DropdownInput = ({value, onChange, onStockSelect, shouldSuggest, setShouldSuggest, suggestions, ...props}) => {
  const width = document.getElementById("dropdownInputContainer")?.clientWidth;

  const handleOnBlur = () => {
    setTimeout(() => {
      setShouldSuggest(false);
    }, 300);
  }

  return (
    <div id="dropdownInputContainer" className="w-full mr-4">
      <input
        onFocus={()=>setShouldSuggest(true)}
        onBlur={handleOnBlur}
        className="w-full focus:outline-none rounded-md py-2 px-4 bg-gray-300"
        type="text" value={value}
        onChange={onChange}
        value={"Security Name"}
      />
      {
        shouldSuggest
          &&
            <div style={{maxHeight: 200, width}} className="absolute overflow-y-auto bg-gray-200">
              {
                suggestions.length
                  ?
                    suggestions.map((item, index)=>(
                      <div
                        key={index}
                        onClick={()=>onStockSelect(item)}
                        className="w-full py-2 px-4 relative cursor-pointer border-b-2 border-gray-300"
                      >
                        {item.label}
                      </div>
                    ))
                  :
                    <div className="w-full text-center border-b-2 py-2 px-4 border-gray-300">no items matched</div>
              }
            </div>
      }
    </div>
  )
}

export default DropdownInput;
