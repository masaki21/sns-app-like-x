import type { SettingSection } from "@/types/social";

export function SettingsPanel({ sections }: { sections: SettingSection[] }) {
  return (
    <div className="space-y-6">
      {sections.map((section) => (
        <section
          key={section.id}
          className="rounded-3xl border border-neutral-800 bg-neutral-900/60 p-6"
        >
          <header>
            <h2 className="text-lg font-semibold text-neutral-100">{section.title}</h2>
            <p className="mt-1 text-sm text-neutral-500">{section.description}</p>
          </header>
          <div className="mt-4 space-y-4">
            {section.fields.map((field) => (
              <label key={field.id} className="flex flex-col gap-2">
                <span className="text-sm font-medium text-neutral-200">{field.label}</span>
                {field.type === "switch" ? (
                  <button
                    type="button"
                    className="flex w-fit items-center gap-2 rounded-full border border-neutral-700 px-4 py-2 text-sm text-neutral-200"
                  >
                    オン / オフ
                  </button>
                ) : (
                  <input
                    type={field.type === "password" ? "password" : field.type}
                    className="rounded-lg border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-neutral-100 outline-none"
                    placeholder={field.placeholder}
                    defaultValue={field.value}
                  />
                )}
                {field.description ? (
                  <span className="text-xs text-neutral-500">{field.description}</span>
                ) : null}
              </label>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
