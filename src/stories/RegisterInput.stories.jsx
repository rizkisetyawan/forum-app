import RegisterInput from '../components/RegisterInput';

const stories = {
  title: 'RegisterInput',
  component: RegisterInput
};

function TemplateStory(args) {
  return <RegisterInput {...args} />;
}

const ComponentProps = TemplateStory.bind({});
ComponentProps.args = {
  onRegister: () => {},
  variantTextInput: 'default',
  variantButton: 'filled',
};

export { ComponentProps };

export default stories;
