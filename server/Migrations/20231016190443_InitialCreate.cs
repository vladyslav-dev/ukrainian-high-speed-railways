using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace UHR.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Cargos",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "text", nullable: false),
                    weight = table.Column<decimal>(type: "numeric", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cargos", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Destinations",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    origin_city = table.Column<string>(type: "text", nullable: false),
                    origin_latitude = table.Column<float>(type: "real", nullable: false),
                    origin_longitude = table.Column<float>(type: "real", nullable: false),
                    destination_city = table.Column<string>(type: "text", nullable: false),
                    destination_latitude = table.Column<float>(type: "real", nullable: false),
                    destination_longitude = table.Column<float>(type: "real", nullable: false),
                    current_latitude = table.Column<float>(type: "real", nullable: false),
                    current_longitude = table.Column<float>(type: "real", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Destinations", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "TrainTypes",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    type = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TrainTypes", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "WagonTypes",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    type = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WagonTypes", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Trains",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "text", nullable: false),
                    typeid = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Trains", x => x.id);
                    table.ForeignKey(
                        name: "FK_Trains_TrainTypes_typeid",
                        column: x => x.typeid,
                        principalTable: "TrainTypes",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Routes",
                columns: table => new
                {
                    id = table.Column<string>(type: "text", nullable: false),
                    name = table.Column<string>(type: "text", nullable: false),
                    destinationid = table.Column<int>(type: "integer", nullable: false),
                    departure_date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    arrival_date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Trainid = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Routes", x => x.id);
                    table.ForeignKey(
                        name: "FK_Routes_Destinations_destinationid",
                        column: x => x.destinationid,
                        principalTable: "Destinations",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Routes_Trains_Trainid",
                        column: x => x.Trainid,
                        principalTable: "Trains",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "Wagons",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    trainid = table.Column<int>(type: "integer", nullable: false),
                    number = table.Column<int>(type: "integer", nullable: false),
                    typeid = table.Column<int>(type: "integer", nullable: false),
                    Cargoid = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Wagons", x => x.id);
                    table.ForeignKey(
                        name: "FK_Wagons_Cargos_Cargoid",
                        column: x => x.Cargoid,
                        principalTable: "Cargos",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_Wagons_Trains_trainid",
                        column: x => x.trainid,
                        principalTable: "Trains",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Wagons_WagonTypes_typeid",
                        column: x => x.typeid,
                        principalTable: "WagonTypes",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Seats",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    wagonid = table.Column<int>(type: "integer", nullable: false),
                    number = table.Column<int>(type: "integer", nullable: false),
                    reserved = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Seats", x => x.id);
                    table.ForeignKey(
                        name: "FK_Seats_Wagons_wagonid",
                        column: x => x.wagonid,
                        principalTable: "Wagons",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Tickets",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    seatid = table.Column<int>(type: "integer", nullable: false),
                    price = table.Column<decimal>(type: "numeric", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tickets", x => x.id);
                    table.ForeignKey(
                        name: "FK_Tickets_Seats_seatid",
                        column: x => x.seatid,
                        principalTable: "Seats",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Passengers",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ticketid = table.Column<int>(type: "integer", nullable: false),
                    firstName = table.Column<string>(type: "text", nullable: false),
                    middleName = table.Column<string>(type: "text", nullable: true),
                    lastName = table.Column<string>(type: "text", nullable: false),
                    email = table.Column<string>(type: "text", nullable: false),
                    phone = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Passengers", x => x.id);
                    table.ForeignKey(
                        name: "FK_Passengers_Tickets_ticketid",
                        column: x => x.ticketid,
                        principalTable: "Tickets",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Passengers_ticketid",
                table: "Passengers",
                column: "ticketid");

            migrationBuilder.CreateIndex(
                name: "IX_Routes_destinationid",
                table: "Routes",
                column: "destinationid");

            migrationBuilder.CreateIndex(
                name: "IX_Routes_Trainid",
                table: "Routes",
                column: "Trainid");

            migrationBuilder.CreateIndex(
                name: "IX_Seats_wagonid",
                table: "Seats",
                column: "wagonid");

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_seatid",
                table: "Tickets",
                column: "seatid");

            migrationBuilder.CreateIndex(
                name: "IX_Trains_typeid",
                table: "Trains",
                column: "typeid");

            migrationBuilder.CreateIndex(
                name: "IX_Wagons_Cargoid",
                table: "Wagons",
                column: "Cargoid");

            migrationBuilder.CreateIndex(
                name: "IX_Wagons_trainid",
                table: "Wagons",
                column: "trainid");

            migrationBuilder.CreateIndex(
                name: "IX_Wagons_typeid",
                table: "Wagons",
                column: "typeid");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Passengers");

            migrationBuilder.DropTable(
                name: "Routes");

            migrationBuilder.DropTable(
                name: "Tickets");

            migrationBuilder.DropTable(
                name: "Destinations");

            migrationBuilder.DropTable(
                name: "Seats");

            migrationBuilder.DropTable(
                name: "Wagons");

            migrationBuilder.DropTable(
                name: "Cargos");

            migrationBuilder.DropTable(
                name: "Trains");

            migrationBuilder.DropTable(
                name: "WagonTypes");

            migrationBuilder.DropTable(
                name: "TrainTypes");
        }
    }
}
