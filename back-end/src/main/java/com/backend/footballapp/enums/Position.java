package com.backend.footballapp.enums;

public enum Position {
    GK("Goalkeeper"),
    CB("Centre-back"),
    RB("Right-back"),
    LB("Left-back"),
    RWB("Right Wing-back"),
    LWB("Left Wing-back"),
    CM("Central Midfielder"),
    CDM("Defensive Midfielder"),
    CAM("Attacking Midfielder"),
    RM("Right Midfielder"),
    LM("Left Midfielder"),
    ST("Striker"),
    CF("Centre Forward"),
    RF("Right Forward"),
    LF("Left Forward"),
    RW("Right Winger"),
    LW("Left Winger");

    private final String name;

    Position(String name) { this.name = name; }

    public String getName() { return this.name; }

}
