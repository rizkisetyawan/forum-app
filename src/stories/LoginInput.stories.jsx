import LoginInput from '../components/LoginInput';

const stories = {
  title: 'LoginInput',
  component: LoginInput
};

function TemplateStory(args) {
  return <LoginInput {...args} />;
}

const ComponentProps = TemplateStory.bind({});
ComponentProps.args = {
  onLogin: () => {},
  variantTextInput: 'default',
  variantButton: 'filled',
};

export { ComponentProps };

export default stories;
