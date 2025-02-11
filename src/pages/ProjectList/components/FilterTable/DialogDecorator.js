import React from 'react';
import ReactDOM from 'react-dom';

// 包装 Dialog 类组件，使其支持 show、hide 这种命令式调用
const CreateFuncDialog = (WrapperElement) => {
  let instance = null;
  let container = null;

  return {
    // 创建并打开一个弹窗，并传入初始化的 props
    show: (props) => {
      // 如果已经有实例打开了，则不会继续打开
      if (instance) {
        return;
      }

      const originAfterClose = props.afterClose;

      container = document.createElement('div');
      document.body.appendChild(container);
      instance = ReactDOM.render(
        <WrapperElement
          {...props}
          afterClose={() => {
            ReactDOM.unmountComponentAtNode(container);
            instance = null;
            container.parentNode.removeChild(container);
            if (typeof originAfterClose === 'function') {
              originAfterClose();
            }
          }}
          visible
        />,
        container
      );
    },
    // 隐藏并销毁弹窗
    hide: () => {
      if (instance) {
        instance.setState({ visible: false });
      }
    },

  };
};

export default CreateFuncDialog;
