import RegisterInput from '../components/RegisterInput';

const stories = {
  title: 'RegisterInput',
  component: RegisterInput,
  tags: ['autodocs']
};

function TemplateStory(args) {
  return <RegisterInput {...args} />;
}

const Default = TemplateStory.bind({});
Default.args = {
  onRegister: () => {},
  variantTextInput: 'default',
  variantButton: 'filled',
};

export { Default };

export default stories;
