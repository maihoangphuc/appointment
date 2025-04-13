import { CheckIcon } from "lucide-react";
import { StepIndicatorProps } from "../../types/components/stepIndicator";

export function StepIndicator({ steps }: StepIndicatorProps) {
  return (
    <div
      className="sticky top-[84px] bg-light-form-bg dark:bg-dark-form-bg rounded-lg p-4 overflow-hidden shadow-sm"
      role="navigation"
      aria-label="Steps"
    >
      <div className="flex flex-col relative z-10">
        {steps.map((step, index) => (
          <div
            key={step.number}
            className="relative"
            role="listitem"
            aria-current={step.isActive ? "step" : undefined}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-4">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-200 ${
                    step.isCompleted
                      ? "bg-light-primary dark:bg-dark-primary"
                      : step.isActive
                      ? "bg-light-primary dark:bg-dark-primary ring-2 ring-offset-2 ring-light-primary dark:ring-dark-primary"
                      : "bg-slate-200 dark:bg-slate-700"
                  }`}
                  aria-label={`Step ${step.number}: ${step.title}`}
                >
                  {step.isCompleted ? (
                    <CheckIcon
                      className="w-5 h-5 text-white"
                      aria-hidden="true"
                    />
                  ) : (
                    <span
                      className={`text-sm font-medium ${
                        step.isActive
                          ? "text-white"
                          : "text-slate-700 dark:text-white"
                      }`}
                    >
                      {step.number}
                    </span>
                  )}
                </div>
              </div>
              <div className="pt-1 pb-6">
                <p
                  className={`text-sm font-medium ${
                    step.isActive || step.isCompleted
                      ? "text-light-primary dark:text-dark-primary"
                      : "text-slate-500 dark:text-slate-400"
                  }`}
                >
                  Step {step.number}
                </p>
                <p
                  className={`text-base font-medium ${
                    step.isActive || step.isCompleted
                      ? "text-light-text dark:text-dark-text"
                      : "text-slate-600 dark:text-slate-400"
                  }`}
                >
                  {step.title}
                </p>
              </div>
            </div>

            {index < steps.length - 1 && (
              <div
                className="absolute left-4 top-8 w-px bg-slate-300 dark:bg-slate-700"
                style={{
                  height: "calc(100% - 8px)",
                  transform: "translateX(-50%)",
                }}
                aria-hidden="true"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
