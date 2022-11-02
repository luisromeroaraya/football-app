package com.backend.footballapp.exceptions;

public class CannotEditException extends IllegalArgumentException {
    private final Class<?> clazz;
    private final Object entity;
    private final Object user;

    public CannotEditException(Class<?> clazz, Object entity, Object user) {
        super("User '" + user + "' cannot edit " + clazz.getSimpleName() + " '" + entity + "'.");
        this.clazz = clazz;
        this.entity = entity;
        this.user = user;
    }

    public Class<?> getClazz() {
        return clazz;
    }

    public Object getEntity() {
        return entity;
    }

    public Object getUser() {
        return user;
    }
}