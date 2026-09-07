const API_URL = "http://127.0.0.1:8000";

export async function getSimulation(
  temperature = -35,
  windSpeed = 40,
  primaryGeneratorFailed = false,
  backupGeneratorFailed = false
) {
  const params = new URLSearchParams({
    temperature,
    wind_speed: windSpeed,
    primary_generator_failed: primaryGeneratorFailed,
    backup_generator_failed: backupGeneratorFailed
  });

  const response = await fetch(
    `${API_URL}/simulate?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error(
      `Backend request failed: ${response.status}`
    );
  }

  return response.json();
}