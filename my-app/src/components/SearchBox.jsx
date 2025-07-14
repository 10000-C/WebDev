import React, { useState, useEffect, useCallback, forwardRef } from 'react';

const SearchBox = forwardRef(({
  value: propValue,
  onChange,
  placeholder = "搜索...",
  className = "",
  ...restProps
}, ref) => {
  const [inputValue, setInputValue] = useState(propValue || "");
  
  // 同步外部值变化
  useEffect(() => {
    if (propValue !== undefined) {
      setInputValue(propValue);
    }
  }, [propValue]);

  // 输入变化处理（仅更新状态，不触发搜索）
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  // 清除搜索
  const handleClear = () => {
    setInputValue("");
    onChange && onChange(""); // 立即触发空搜索
  };

  // 回车键触发搜索 ✅
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      // 立即触发搜索
      onChange && onChange(inputValue);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      
      <input
        ref={ref}
        type="text"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown} // 保留键盘事件监听
        placeholder={placeholder}
        className="block w-full pl-10 pr-10 py-2 border border-grey-500 rounded-md focus:ring-blue-500 focus:border-blue-500"
        {...restProps}
      />
      
      {inputValue && (
        <button 
          onClick={handleClear}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
          aria-label="清除搜索"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
});

SearchBox.displayName = 'SearchBox';

export default SearchBox;