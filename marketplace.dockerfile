#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.
FROM node:lts-alpine as client_builder
WORKDIR /app
COPY Client/marketplace-client/package*.json ./
RUN npm install
COPY Client/marketplace-client ./
ENV NODE_ENV="production"
RUN npm run build

# https://hub.docker.com/_/microsoft-dotnet
FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS server_builder
WORKDIR /source
# copy csproj and restore as distinct layers
COPY Server/*.csproj ./
RUN dotnet restore
# copy everything else and build app
COPY Server/. ./
RUN dotnet publish "Server.csproj" -c Release -o /source/publish

# final stage/image
FROM mcr.microsoft.com/dotnet/core/aspnet:3.1
WORKDIR /app
COPY --from=server_builder /source/publish ./
COPY --from=client_builder /app/build ./wwwroot/
ENTRYPOINT ["dotnet", "Server.dll"]