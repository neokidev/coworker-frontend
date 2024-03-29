import {
  Paper,
  Group,
  Title,
  Container,
  useMantineTheme,
  Grid,
} from '@mantine/core'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconCheck, IconX } from '@tabler/icons-react'
import {
  CheckboxGroup,
  DateInput,
  FileInput,
  MultiSelect,
  NumberInput,
  PasswordInput,
  PinInput,
  RadioGroup,
  Select,
  SwitchGroup,
  Textarea,
  TextInput,
  useForm,
} from '@/components/Form'

const FormArea = () => {
  const theme = useMantineTheme()
  const schema = z
    .object({
      username: z.string().min(1, { message: 'Required' }),
      password: z.string().min(1, { message: 'Required' }),
      age: z
        .number()
        .positive()
        .nullable()
        .superRefine((value, ctx) => {
          if (value == null) {
            ctx.addIssue({
              code: 'custom',
              message: 'Required',
            })
          }
        }),
      confirmPassword: z.string().min(1, { message: 'Required' }),
      email: z
        .string()
        .min(1, { message: 'Required' })
        .email({ message: 'Wrong Format' }),
      drinks: z.string().array().min(1, { message: 'Required' }),
      position: z.string().min(1, { message: 'Required' }),
      browser: z.string().min(1, { message: 'Required' }),
      comments: z.string().min(1, { message: 'Required' }),
      date: z
        .date()
        .nullable()
        .superRefine((value, ctx) => {
          if (value == null) {
            ctx.addIssue({
              code: 'custom',
              message: 'Required',
            })
          }
        }),
      programmingLanguage: z.string().array().min(1, { message: 'Required' }),
      resume: z.custom<File>().array().min(1, { message: 'Required' }),
      notification: z.string().array().optional(),
      code: z.string().superRefine((value, ctx) => {
        if (value.length === 6 && value !== '123456') {
          ctx.addIssue({
            code: 'custom',
            message: 'Wrong Code',
          })
        }

        if (methods.formState.isSubmitting && value.length !== 6) {
          ctx.addIssue({
            code: 'custom',
            message: 'Required',
          })
        }
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    })

  const [Form, methods] = useForm<{
    username: string
    email: string
    age: number | null
    password: string
    confirmPassword: string
    drinks: Array<string>
    position: string
    browser: string
    comments: string
    date: Date | null
    programmingLanguage: Array<string>
    resume: File[]
    notification: string[]
    code: string
  }>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: '',
      password: '',
      age: null,
      confirmPassword: '',
      email: '',
      drinks: [],
      position: '',
      browser: '',
      comments: '',
      date: null,
      programmingLanguage: [],
      resume: [],
      notification: ['agreed'],
      code: '',
    },
    mode: 'onTouched',
    onSubmit: (data) => {
      console.log(data)
    },
  })

  return (
    <Form>
      <Grid justify="center" gutter="xl">
        <Grid.Col xs={12} sm={12} md={6} lg={6}>
          <TextInput label="Username" name="username" withAsterisk />
        </Grid.Col>
        <Grid.Col xs={12} sm={12} md={6} lg={6}>
          <TextInput type="email" label="Email" name="email" withAsterisk />
        </Grid.Col>
        <Grid.Col xs={12} sm={12} md={6} lg={6}>
          <PasswordInput label="Password" name="password" withAsterisk />
        </Grid.Col>
        <Grid.Col xs={12} sm={12} md={6} lg={6}>
          <PasswordInput
            label="Confirm Password"
            name="confirmPassword"
            withAsterisk
          />
        </Grid.Col>
        <Grid.Col xs={12} sm={12} md={6} lg={6}>
          <CheckboxGroup
            label="Drinks"
            name="drinks"
            options={[
              { label: 'Coffee', value: 'coffee' },
              { label: 'Tea', value: 'tea' },
              { label: 'Wine', value: 'wine' },
            ]}
            withAsterisk
          />
        </Grid.Col>
        <Grid.Col xs={12} sm={12} md={6} lg={6}>
          <Select
            label="Position"
            name="position"
            options={[
              { label: 'Firefox', value: 'firefox' },
              { label: 'Edge', value: 'edge' },
              { label: 'Chrome', value: 'chrome' },
              { label: 'Opera', value: 'opera' },
              { label: 'Safari', value: 'safari' },
            ]}
            withAsterisk
          />
        </Grid.Col>
        <Grid.Col xs={12} sm={12} md={6} lg={6}>
          <RadioGroup
            label="Browser"
            name="browser"
            options={[
              { label: 'Firefox', value: 'firefox' },
              { label: 'Edge', value: 'edge' },
              { label: 'Chrome', value: 'chrome' },
              { label: 'Opera', value: 'opera' },
              { label: 'Safari', value: 'safari' },
            ]}
            withAsterisk
          />
        </Grid.Col>
        <Grid.Col xs={12} sm={12} md={6} lg={6}>
          <DateInput
            label="Date"
            name="date"
            placeholder="Pick Date"
            withAsterisk
            allowDeselect
          />
        </Grid.Col>
        <Grid.Col xs={12} sm={12} md={6} lg={6}>
          <NumberInput label="Age" name="age" withAsterisk min={1} />
        </Grid.Col>
        <Grid.Col xs={12} sm={12} md={6} lg={6}>
          <MultiSelect
            label="Programming Language"
            name="programmingLanguage"
            options={[
              {
                label: 'Javascript',
                value: 'javascript',
              },
              {
                label: 'Typescript',
                value: 'typescript',
              },
              {
                label: 'Go',
                value: 'go',
              },
              {
                label: 'Python',
                value: 'python',
              },
              {
                label: 'Rust',
                value: 'rust',
              },
            ]}
            clearable
            searchable
            creatable
            withAsterisk
          />
        </Grid.Col>
        <Grid.Col xs={12} sm={12} md={12} lg={12}>
          <FileInput
            label="Resume"
            name="resume"
            multiple
            clearable
            withAsterisk
            accept="application/pdf"
          />
        </Grid.Col>
        <Grid.Col xs={12} sm={12} md={12} lg={12}>
          <Textarea label="Comments" name="comments" withAsterisk />
        </Grid.Col>
        <Grid.Col xs={12} sm={12} md={12} lg={12}>
          <SwitchGroup
            label="Settings"
            name="notification"
            options={[
              {
                label: 'I agree to receive notifications',
                value: 'agreed',
                color: 'teal',
                thumbIcon:
                  methods.watch('notification').length > 0 ? (
                    <IconCheck
                      size={12}
                      color={theme.colors.teal[theme.fn.primaryShade()]}
                      stroke={3}
                    />
                  ) : (
                    <IconX
                      size={12}
                      color={theme.colors.red[theme.fn.primaryShade()]}
                      stroke={3}
                    />
                  ),
              },
            ]}
          />
        </Grid.Col>
        <Grid.Col xs={12} sm={12} md={12} lg={12} mt={10}>
          <PinInput
            label="Verification Code"
            name="code"
            oneTimeCode
            placeholder=""
            withAsterisk
            mask
            length={6}
            size="md"
          />
        </Grid.Col>
        <Grid.Col xs={3.5} sm={2.5} md={2.5} lg={2.5} xl={2.5} mt={10}>
          <Form.SubmitButton loading={methods.formState.isSubmitting}>
            {methods.formState.isSubmitting ? 'Submitting' : 'Submit'}
          </Form.SubmitButton>
        </Grid.Col>
      </Grid>
    </Form>
  )
}

const Demo = () => {
  return (
    <Container size={700} my={20}>
      <Group position="right" mt={5}></Group>
      <Title order={1} align="center">
        Form Demo
      </Title>
      <Paper shadow="md" mt={20} p={45} radius="md" withBorder>
        <FormArea />
      </Paper>
    </Container>
  )
}

export default Demo
