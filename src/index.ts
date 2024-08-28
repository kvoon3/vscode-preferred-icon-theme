import { defineExtension, useActiveColorTheme, watch } from 'reactive-vscode'
import { ColorThemeKind, ConfigurationTarget, workspace } from 'vscode'
import { config } from './config'

const { activate, deactivate } = defineExtension(() => {
  const theme = useActiveColorTheme()

  watch(theme, ({ kind }) => {
    if (!config.enable)
      return

    const iconTheme = workspace.getConfiguration('workbench').get('iconTheme')

    workspace
      .getConfiguration('workbench')
      .update(
        'iconTheme',
        kind === ColorThemeKind.Light
          ? config.light || iconTheme
          : config.dark || iconTheme,
        ConfigurationTarget.Global,
      )
  })
})

export { activate, deactivate }
