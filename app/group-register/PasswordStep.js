import { Check, X } from 'lucide-react';

export default function PasswordStep({
  form,
  errors,
  onChange,
  passwordRequirements,
}) {
  return (
    <div className="space-y-5">
      <h2 className="text-xl font-bold text-black mb-4">Set Your Password</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 font-rhm">
          Password *
        </label>
        <input
          name="password"
          value={form.password}
          onChange={onChange}
          className={`mt-1 block w-full border p-2 text-black placeholder-gray-400 ${
            errors.password ? 'border-red-500' : 'border-gray-300'
          }`}
          type="password"
          placeholder="Enter a strong password"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 font-rhm">
          Confirm Password *
        </label>
        <input
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={onChange}
          className={`mt-1 block w-full border p-2 text-black placeholder-gray-400 ${
            errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
          }`}
          type="password"
          placeholder="Re-enter your password"
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-600">
            {errors.confirmPassword}
          </p>
        )}
      </div>

      {/* Password Requirements Checklist */}
      <div className="bg-gray-50 border border-gray-200 p-4 rounded">
        <p className="text-sm font-semibold text-gray-800 mb-3">
          Password Requirements:
        </p>
        <ul className="space-y-2">
          <PasswordRequirementItem
            met={passwordRequirements.minLength}
            text="At least 6 characters long"
          />
          <PasswordRequirementItem
            met={passwordRequirements.hasUpperCase}
            text="Include at least one capital letter"
          />
          <PasswordRequirementItem
            met={passwordRequirements.hasNumber}
            text="Include at least one number"
          />
          <PasswordRequirementItem
            met={passwordRequirements.hasSymbol}
            text="Include at least one symbol (!@#$%^&*...)"
          />
        </ul>
      </div>

      {/* Password Match Indicator */}
      {form.confirmPassword && (
        <div
          className={`p-3 rounded border ${
            form.password === form.confirmPassword
              ? 'bg-green-50 border-green-200 text-green-700'
              : 'bg-red-50 border-red-200 text-red-700'
          }`}
        >
          <div className="flex items-center gap-2">
            {form.password === form.confirmPassword ? (
              <>
                <Check className="w-4 h-4" />
                <span className="text-sm font-medium">Passwords match!</span>
              </>
            ) : (
              <>
                <X className="w-4 h-4" />
                <span className="text-sm font-medium">
                  Passwords do not match
                </span>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function PasswordRequirementItem({ met, text }) {
  return (
    <li className="flex items-center gap-2 text-sm">
      <div
        className={`w-5 h-5 rounded-full flex items-center justify-center ${
          met ? 'bg-green-500' : 'bg-gray-300'
        }`}
      >
        {met ? (
          <Check className="w-3 h-3 text-white" />
        ) : (
          <X className="w-3 h-3 text-gray-500" />
        )}
      </div>
      <span className={met ? 'text-green-700' : 'text-gray-600'}>{text}</span>
    </li>
  );
}
