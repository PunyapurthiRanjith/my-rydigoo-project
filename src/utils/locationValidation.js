export const validateLocationFields = (fromPlace, toPlace, { fromTouched, toTouched, submitted } = {}) => {
  const errors = {};
  const fromLabel = fromPlace.label.trim();
  const toLabel = toPlace.label.trim();
  const showFrom = fromTouched || submitted;
  const showTo = toTouched || submitted;

  if (showFrom) {
    if (!fromLabel) {
      errors.fromError = "Pickup location is required";
    } else if (!fromPlace.lat || !fromPlace.lng) {
      errors.fromError = "Select pickup from the suggestions list";
    }
  }

  if (showTo) {
    if (!toLabel) {
      errors.destinationError = "Drop location is required";
    } else if (!toPlace.lat || !toPlace.lng) {
      errors.destinationError = "Select destination from the suggestions list";
    }
  }

  if (fromLabel && toLabel && fromLabel.toLowerCase() === toLabel.toLowerCase()) {
    errors.destinationError = "Destination must be different from pickup";
  }

  return errors;
};

export const hasBlockingLocationErrors = (errors) =>
  Boolean(errors.fromError || errors.destinationError);
