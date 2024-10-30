-- CreateTable
CREATE TABLE "SoilMoistureReading" (
    "id" SERIAL NOT NULL,
    "sensorId" TEXT NOT NULL,
    "moisture" DOUBLE PRECISION NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SoilMoistureReading_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TemperatureHumidityReading" (
    "id" SERIAL NOT NULL,
    "sensorId" TEXT NOT NULL,
    "temperature" DOUBLE PRECISION NOT NULL,
    "humidity" DOUBLE PRECISION NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TemperatureHumidityReading_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WaterPumpStatus" (
    "id" SERIAL NOT NULL,
    "sensorId" TEXT NOT NULL,
    "isOn" BOOLEAN NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WaterPumpStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WaterLevelStatus" (
    "id" SERIAL NOT NULL,
    "sensorId" TEXT NOT NULL,
    "hasWater" BOOLEAN NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WaterLevelStatus_pkey" PRIMARY KEY ("id")
);
